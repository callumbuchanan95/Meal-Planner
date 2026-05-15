export default function RecipePage({ params }: { params: { id: string } }) {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold text-gray-900">Recipe</h1>
      <p className="mt-1 text-sm text-gray-500">ID: {params.id}</p>
    </div>
  )
}
