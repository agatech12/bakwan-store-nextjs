import Image from 'next/image'
import Navbar from '../components/Navbar';
import HeroSection from '@/components/HeroSection';
import ProductSection from '@/components/ProductSection';
import RankSection from '@/components/RankSection';


export default function Home() {
  return (
    <div>
      <Navbar />
      <HeroSection /> 
      <ProductSection />
      <RankSection />
    </div>
  );
};
