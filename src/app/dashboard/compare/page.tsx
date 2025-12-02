export default function Page() {
    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold">Compare Products</h1>
            <p>Provide product IDs in the URL</p>
            <br></br>
            <p>
                /dashboard/compare/1/2<br></br>or<br></br>
                /dashboard/compare/1/2/3
            </p>
        </div>
    );
}
