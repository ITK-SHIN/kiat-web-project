export default function Card({ title, children }){
    return (
    <div className="card">
    {title && <h3 className="mt-0 mb-2 font-semibold">{title}</h3>}
    {children}
    </div>
    );
    }