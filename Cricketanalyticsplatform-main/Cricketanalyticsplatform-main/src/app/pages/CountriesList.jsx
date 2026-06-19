import { useQuery } from '@tanstack/react-query';
import { api } from '../services/api.js';

export function CountriesList() {
  const { data: response, isLoading } = useQuery({
    queryKey: ['countries'],
    queryFn: () => api.getCountries(0), // Free tier might not need offset for countries
  });

  return (
    <main className="flex-1 w-full max-w-[1540px] mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Cricket Playing Nations</h1>
      
      {isLoading ? (
        <div className="text-muted-foreground animate-pulse">Loading countries...</div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {response?.data?.map((country) => (
            <div 
              key={country.id || country.name}
              className="bg-card border border-border rounded-xl p-4 flex flex-col items-center text-center h-full"
            >
              <div className="w-16 h-12 bg-muted rounded-md mb-3 flex items-center justify-center overflow-hidden border border-border">
                 {country.genericFlag ? (
                   <img src={country.genericFlag} alt={country.name} className="w-full h-full object-cover" />
                 ) : (
                   <span className="text-lg font-bold text-muted-foreground">{country.name.substring(0,2).toUpperCase()}</span>
                 )}
              </div>
              <h3 className="font-bold text-sm">{country.name}</h3>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
