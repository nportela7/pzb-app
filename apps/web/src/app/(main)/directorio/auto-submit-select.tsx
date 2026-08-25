"use client";

export function AutoSubmitSelect({
  name,
  label,
  value,
  options,
}: {
  name: string;
  label: string;
  value?: string;
  options: string[];
}) {
  return (
    <select
      name={name}
      defaultValue={value ?? ""}
      onChange={(e) => e.currentTarget.form?.requestSubmit()}
      className="appearance-none bg-cream text-sm text-earth-brown border border-earth-brown/40 rounded-full pl-4 pr-8 py-1.5 cursor-pointer bg-[length:0.6rem] bg-no-repeat hover:border-earth-brown/70 transition-colors"
      style={{
        backgroundImage:
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 10 6'%3E%3Cpath d='M1 1l4 4 4-4' fill='none' stroke='%23594434' stroke-width='1.3'/%3E%3C/svg%3E\")",
        backgroundPosition: "right 0.9rem center",
      }}
    >
      <option value="">{label}</option>
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  );
}
