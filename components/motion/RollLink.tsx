import Link from "next/link";
import s from "./RollLink.module.css";

type Props = {
  href: string;
  children: string;
  className?: string;
};

/**
 * Ховер: текст перекатывается, подчёркивание прочерчивается слева и уходит вправо.
 * Внутренние адреса — через next/link, mailto:/tel: — обычной ссылкой.
 */
export default function RollLink({ href, children, className }: Props) {
  const inner = (
    <span className={s.text} data-text={children}>
      {children}
    </span>
  );
  const cls = `${s.link} ${className ?? ""}`;
  return href.startsWith("/") ? (
    <Link href={href} className={cls}>
      {inner}
    </Link>
  ) : (
    <a href={href} className={cls}>
      {inner}
    </a>
  );
}
