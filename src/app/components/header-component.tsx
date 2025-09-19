export default function HeaderComponent() {
    return (
        <div className="bg-white fixed w-full z-[9999] p-6 flex justify-between">
            <div>
                <p>Girls in STEM</p>
            </div>
            <div className="flex gap-6 list-none">
                <li>Sobre</li>
                <li>Fatec Jahu</li>
                <li>Resultados</li>
                <li>Projetos</li>
                <li>Membros</li>
                <li>Contato</li>
            </div>
        </div>
    )
}