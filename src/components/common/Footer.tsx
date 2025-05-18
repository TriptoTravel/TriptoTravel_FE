export default function Footer() {
  return (
    <footer className="w-full h-28 bg-black shadow-[0px_-4px_4px_rgba(0,0,0,0.25)] grid grid-rows-[1fr_1fr] grid-cols-3 text-xxs text-white font-normal font-serif">
      <div className="flex items-center justify-center">Policy</div>

      <a
        href="https://github.com/TriptoTravel"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center hover:underline"
      >
        About Us
      </a>

      <a
        href="https://naver.me/F6nkxNdY"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center hover:underline"
      >
        Feedback
      </a>

      <div className="col-span-3 flex items-center justify-center">
        © 2025 Trip to Travel. All rights reserved.
      </div>
    </footer>
  );
}
