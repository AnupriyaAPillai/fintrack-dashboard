export default function Pagination({
  page,
  setPage,
  totalPages,
}) {
  if (totalPages <= 1)
    return null;

  return (
    <div className="flex gap-2 mt-4 justify-center">

      <button
        disabled={page === 1}
        onClick={() =>
          setPage(page - 1)
        }
        className="px-3 py-1 border border-border rounded"
      >
        Prev
      </button>

      {[...Array(totalPages)].map(
        (_, i) => (
          <button
            key={i}
            onClick={() =>
              setPage(i + 1)
            }
            className={`px-3 py-1 rounded ${
              page === i + 1
                ? "bg-accent text-white"
                : "border border-border"
            }`}
          >
            {i + 1}
          </button>
        )
      )}

      <button
        disabled={
          page === totalPages
        }
        onClick={() =>
          setPage(page + 1)
        }
        className="px-3 py-1 border border-border rounded"
      >
        Next
      </button>

    </div>
  );
}