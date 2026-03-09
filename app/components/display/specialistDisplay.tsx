import heroContent from '../data/heroContent';

const SpecialistDisplay = async () => {
  const heroValues = await heroContent("doctors");
  return (
    <div className="grid md:grid-cols-3 gap-8">
      {heroValues && heroValues.length > 0 ? (
        heroValues.map((item: any) => (
          <div key={item.sys.id} className="specialist-card p-6 bg-white rounded-lg shadow hover:shadow-lg transition-shadow">
            <h3 className="text-xl font-bold text-gray-900 mb-2">{item.fields?.name || "Doctor"}</h3>
            <p className="text-blue-600 font-semibold mb-3">{item.fields?.specialty || "Specialist"}</p>
            <p className="text-gray-600 text-sm leading-relaxed">{item.fields?.description || ""}</p>
          </div>
        ))
      ) : (
        <div className="col-span-3 text-center py-12 text-gray-600">No specialists found</div>
      )}
    </div>
  )
}

export default SpecialistDisplay
