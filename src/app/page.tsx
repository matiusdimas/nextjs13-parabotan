import SectionHome1 from "@/components/home/SectionHome1";
import SectionHome2 from "@/components/home/SectionHome2";
import SectionHome3 from "@/components/home/SectionHome3";

export default function Home() {
  return (
    <div className="flex flex-col gap-16">
      <SectionHome1 />
      <SectionHome2 />
      <SectionHome3 />
    </div>
  )
}
