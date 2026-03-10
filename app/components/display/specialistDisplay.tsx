import heroContent from '../data/heroContent';

const SpecialistDisplay = async () => {
  const doctorValues = await heroContent("doctors");

  return (
    <div className="grid md:grid-cols-3 gap-8">
      {doctorValues && doctorValues.length > 0 ? (
        doctorValues.map((item: any) => {
          const specialization = item.fields?.specialization || [];
          const specializationNames = Array.isArray(specialization)
            ? specialization.map((concept: any) => concept.name || concept).join(" | ")
            : specialization;
          const heroImageField = item.fields?.profilePicture;
          let doctorProfileImage = "";
          let description = "";
          if (typeof heroImageField === "string") {
            doctorProfileImage = heroImageField;
          } else if (heroImageField && typeof heroImageField === "object" && "fields" in heroImageField) {
            doctorProfileImage = (heroImageField as any)?.fields?.file?.url || doctorProfileImage;
            description = (heroImageField as any)?.fields?.description || "";
          }
          const doctorImage = doctorProfileImage;
          return (
            <div key={item.sys.id}>
              <div className="bg-gray-200 h-64 flex items-center justify-center overflow-hidden relative">
                <img src={doctorImage}
                  alt={description}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-blue-600 opacity-0 group-hover:opacity-10 transition-opacity duration-500" />
              </div>
              <div className="specialist-card p-6 bg-white rounded-lg shadow hover:shadow-lg transition-shadow">
                <h3 className="text-xl text-center font-bold text-gray-900 mb-2">{item.fields?.name || "Doctor"}</h3>
                <p className="text-blue-600 text-center font-semibold mb-3">{specializationNames || "Specialist"}</p>
                <p className="text-gray-600 text-center text-sm leading-relaxed">{item.fields?.description || ""}</p>
              </div>
            </div>
          );
        })
      ) : (
        <div className="col-span-3 text-center py-12 text-gray-600">No specialists found</div>
      )}
    </div>
  )
}

export default SpecialistDisplay
