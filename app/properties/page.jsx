import properties from '@/properties.json';

const PropertiesPage = () => {
  return (
    <section class='px-4 py-6'>
      <div class='container-xl lg:container m-auto'>
        <div class='grid grid-cols-1 md:grid-cols-3 gap-6'>
          {properties.map((property) => (
            <div>{property.name}</div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PropertiesPage;
