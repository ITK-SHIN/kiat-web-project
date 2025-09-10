export default function Button({ as: As = 'a', to = '#', children, variant }) {
  const cls = variant === 'secondary' ? 'btn btn-secondary' : 'btn';
  return (
    <As className={cls} href={to}>
      {children}
    </As>
  );
}
