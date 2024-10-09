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
}


export type AnimalInput = {
    name: string;
    species: string;
    age: number;
    breed: string;
    status: 'Valabil' | 'Adoptat';
    imageUrls?: string[];
    sex: string;
    description: string;
    userId?: number;
    id?: number;
}

export interface AnimalFilters {
    species?: string;
    ageMin?: number;
    ageMax?: number;
    breed?: string;
    status?: string;
    sex?: string;
}
