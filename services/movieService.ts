import {
    addDoc,
    collection,
    getDocs,
    increment,
    limit,
    orderBy,
    query,
    updateDoc,
    where
} from "firebase/firestore";
import { db } from "./firebase";

export const TMDB_CONFIG = {
    BASE_URL: "https://api.themoviedb.org/3",
    API_KEY:
        "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ODk5YzM5ZGRmZTIyMWY3MmY3ZmI4ZmYwYzkyODQ0OCIsIm5iZiI6MTc2ODU4OTc0MS45OTgwMDAxLCJzdWIiOiI2OTZhODlhZDBkYjZiZmQ3ZmJkN2U4ZGMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.FEfbYTqXAbcaokpH6A9pH5E24RGzxaN9CtD4A-wIJlY",
    headers: {
        accept: "application/json",
        Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ODk5YzM5ZGRmZTIyMWY3MmY3ZmI4ZmYwYzkyODQ0OCIsIm5iZiI6MTc2ODU4OTc0MS45OTgwMDAxLCJzdWIiOiI2OTZhODlhZDBkYjZiZmQ3ZmJkN2U4ZGMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.FEfbYTqXAbcaokpH6A9pH5E24RGzxaN9CtD4A-wIJlY`,
    },
};

export const fetchMovies = async ({
    query,
}: {
    query: string;
}): Promise<Movie[]> => {
    const endpoint = query
        ? `${TMDB_CONFIG.BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
        : `${TMDB_CONFIG.BASE_URL}/discover/movie?sort_by=popularity.desc`;

    const response = await fetch(endpoint, {
        method: "GET",
        headers: TMDB_CONFIG.headers,
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch movies: ${response.statusText}`);
    }

    const data = await response.json();
    return data.results;
};

export const fetchMovieDetails = async (
    movieId: string,
): Promise<MovieDetails> => {
    try {
        const response = await fetch(
            `${TMDB_CONFIG.BASE_URL}/movie/${movieId}?api_key=${TMDB_CONFIG.API_KEY}`,
            {
                method: "GET",
                headers: TMDB_CONFIG.headers,
            },
        );

        if (!response.ok) {
            throw new Error(`Failed to fetch movie details: ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching movie details:", error);
        throw error;
    }
};

export const increaseMovieSearchCount = async (id: string) => {
    const qury = query(collection(db, "searchCount"), where("movieId", "==", id));

    const snap = await getDocs(qury);

    if (!snap.empty) {
        const docSnap = snap.docs[0];
        console.log(docSnap.data());

        const docRef = snap.docs[0].ref;

        await updateDoc(docRef, {
            count: increment(1),
            updatedAt: new Date(),
        });
    } else {
        console.log(snap);
        console.log("empty");

        await addDoc(collection(db, "searchCount"), {
            movieId: id,
            count: 1,
            createdAt: new Date(),
        });
    }
};

export const getTopSearchedMovies = async () => {

    const qury = query(
        collection(db, "searchCount"),
        orderBy('count', 'desc'),
        limit(10)
    );

    const querySnapshot = await getDocs(qury);
    const ids: string[] = [];
    querySnapshot.forEach((doc) => {
        console.log(doc.id, doc.data());
        ids.push(doc.data().movieId);
    });

    return ids;
};

export const fetchMoviesByIds = async (ids: string[]): Promise<Movie[]> => {

    const requests = ids.map((id) =>
        fetch(`${TMDB_CONFIG.BASE_URL}/movie/${id}`, {
            method: "GET",
            headers: TMDB_CONFIG.headers,
        }).then((res) => {
            if (!res.ok) throw new Error(`Failed to fetch movie ${id}`);
            return res.json();
        })
    );

    const movies = await Promise.all(requests);
    return movies;
};

