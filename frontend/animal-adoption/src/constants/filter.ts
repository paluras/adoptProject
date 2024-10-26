export const DEFAULT_FILTER_VALUES = {
  status: 'Valabil',
  species: '',
  sex: '',
  city: '',
  country: ''
};

export const FILTER_OPTIONS = {
  species: [
    { value: '', label: 'All Species' },
    { value: 'Caine', label: 'Caine' },
    { value: 'Pisica', label: 'Pisica' }
  ],
  status: [
    { value: '', label: 'All Status' },
    { value: 'Valabil', label: 'Available' },
    { value: 'Adoptat', label: 'Adopted' }
  ],
  sex: [
    { value: '', label: 'All Sex' },
    { value: 'Femela', label: 'Femela' },
    { value: 'Mascul', label: 'Mascul' }
  ]
} as const;