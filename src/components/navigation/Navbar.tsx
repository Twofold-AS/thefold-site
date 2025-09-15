import CardNav from "@/components/navigation/CardNav";
import Logo from "@/components/ui/Logo";

export default function Navbar() {
  const items = [
    {
      label: "About",
      bgColor: "#0D0716",
      textColor: "#fff",
      links: [
        { label: "Company", ariaLabel: "About Company", href: "/company" },
        { label: "Careers", ariaLabel: "About Careers", href: "/careers" },
      ],
    },
    {
      label: "Projects",
      bgColor: "#170D27",
      textColor: "#fff",
      links: [
        { label: "Featured", ariaLabel: "Featured Projects", href: "/projects/featured" },
        { label: "Case Studies", ariaLabel: "Project Case Studies", href: "/projects/case-studies" },
      ],
    },
    {
      label: "Contact",
      bgColor: "#271E37",
      textColor: "#fff",
      links: [
        { label: "Email", ariaLabel: "Email us", href: "mailto:hello@twofold.io" },
        { label: "Twitter", ariaLabel: "Twitter", href: "https://twitter.com/yourhandle" },
        { label: "LinkedIn", ariaLabel: "LinkedIn", href: "https://www.linkedin.com/company/yourcompany" },
      ],
    },
  ];

  return (
    <CardNav
      logo={<Logo/>}
      logoAlt="Company Logo"
      items={items}
      baseColor="#000"
      menuColor="#fff"
      buttonBgColor="#fff"
      buttonTextColor="#000"
      ease="power3.out"
    />
  );
}
