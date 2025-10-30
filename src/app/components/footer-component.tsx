export default function FooterComponent() {
    let year = new Date().getFullYear();
    return (
        <div className="bg-white w-full z-[9999] p-4 flex justify-center">
            <div>
                <p> &copy; {year} - Aléxia Cazale</p>
            </div>
        </div>
    )
}