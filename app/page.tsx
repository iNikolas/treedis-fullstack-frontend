import { MapView } from "./_components/map-view";
import { NavigationMenu } from "./_components/navigation-menu";

export default function Home() {
  return (
    <div className="relative h-full">
      <NavigationMenu />
      <MapView />
    </div>
  );
}
