export default function MapDirections({ lat, lng }: { lat: number; lng: number }) {
  return (
    <a
      href={`https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`}
      target="_blank"
      rel="noopener noreferrer"
      className="hover::"
    >
      Get Directions
    </a>
  );
}
