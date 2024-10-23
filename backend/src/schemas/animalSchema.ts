export interface Animal {
    id: number;
    name: string;
    species: 'Caine' | 'Pisica';
    age: number;
    sex: 'Mascul' | 'Femela';
    breed: string;
    description: string;
    status: 'Valabil' | 'Adoptat';
    image_url: string[];
    user_id: number;
    country: string;
    city: string;
    weight: number;
}


export interface AnimalInput {
    name: string;
    species: string;
    age: number;
    breed: string;
    status: 'Valabil' | 'Adoptat';
    imageUrls?: string[];
    sex: "Mascul" | "Femela";
    description: string;
    userId?: number;
    id?: number;
    country: string;
    city: string;
    weight: number;
}

export interface AnimalFilters {
    country?: string;
    city?: string;
    species?: string;
    ageMin?: number;
    ageMax?: number;
    breed?: string;
    status?: string;
    sex?: string;
}
