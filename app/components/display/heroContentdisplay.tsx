import heroContent from "../data/heroContent"

const HeroContentDisplay = async () => {
  const testContent = await heroContent();
  console.log(testContent);
  return (
    <div>
      
    </div>
  )
}

export default HeroContentDisplay
