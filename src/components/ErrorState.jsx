export default function ErrorState({ message }) {
  return (
    <div className=" p-4 text-sm text-red-700">
      {message}
    </div>
  );
}
