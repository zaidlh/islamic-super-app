"use client";
import { useState } from "react";
import { cn } from "@/lib/utils";

const GOLD_NISAB_GRAMS = 87.48;
const SILVER_NISAB_GRAMS = 612.36;
const GOLD_PRICE_USD = 92; // per gram fallback
const SILVER_PRICE_USD = 1.05;

export default function ZakatPage() {
  const [gold, setGold] = useState(0);
  const [silver, setSilver] = useState(0);
  const [cash, setCash] = useState(0);
  const [business, setBusiness] = useState(0);
  const [receivables, setReceivables] = useState(0);
  const [liabilities, setLiabilities] = useState(0);
  const [calculated, setCalculated] = useState(false);

  const goldValue = gold * GOLD_PRICE_USD;
  const silverValue = silver * SILVER_PRICE_USD;
  const totalAssets = goldValue + silverValue + cash + business + receivables;
  const netWorth = totalAssets - liabilities;
  const nisabGold = GOLD_NISAB_GRAMS * GOLD_PRICE_USD;
  const nisabSilver = SILVER_NISAB_GRAMS * SILVER_PRICE_USD;
  const nisabValue = Math.min(nisabGold, nisabSilver);
  const zakatDue = netWorth >= nisabValue;
  const zakatAmount = zakatDue ? netWorth * 0.025 : 0;

  const Field = ({ label, value, onChange, hint }: { label: string; value: number; onChange: (v: number) => void; hint?: string }) => (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-[var(--text)]">{label}</label>
      {hint && <p className="text-xs text-[var(--text-muted)]">{hint}</p>}
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)] text-sm">$</span>
        <input
          type="number"
          min="0"
          value={value || ""}
          onChange={(e) => onChange(Number(e.target.value))}
          className="input-field pl-7"
          placeholder="0.00"
        />
      </div>
    </div>
  );

  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold text-[var(--text)]">حاسبة الزكاة</h1>
        <p className="text-[var(--text-muted)] mt-1">Calculate your annual Zakat obligation</p>
      </div>

      <div className="card p-4 bg-[var(--primary)]/5 border-[var(--primary)]/20">
        <p className="text-sm text-[var(--text)]">
          <span className="font-semibold text-[var(--primary)]">Nisab:</span> Gold basis = ${nisabGold.toFixed(0)} | Silver basis = ${nisabSilver.toFixed(0)}
        </p>
        <p className="text-xs text-[var(--text-muted)] mt-1">Using lower of the two (silver) = <strong className="text-[var(--primary)]">${nisabValue.toFixed(0)}</strong></p>
      </div>

      <div className="card p-6 space-y-5">
        <h2 className="section-title">Assets</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-[var(--text)]">Gold (grams)</label>
            <p className="text-xs text-[var(--text-muted)]">≈ ${GOLD_PRICE_USD}/g · Value: ${goldValue.toFixed(0)}</p>
            <input type="number" min="0" value={gold || ""} onChange={(e) => setGold(Number(e.target.value))} className="input-field" placeholder="0" />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-[var(--text)]">Silver (grams)</label>
            <p className="text-xs text-[var(--text-muted)]">≈ ${SILVER_PRICE_USD}/g · Value: ${silverValue.toFixed(0)}</p>
            <input type="number" min="0" value={silver || ""} onChange={(e) => setSilver(Number(e.target.value))} className="input-field" placeholder="0" />
          </div>
          <Field label="Cash & Bank Savings ($)" value={cash} onChange={setCash} hint="All liquid assets" />
          <Field label="Business Inventory ($)" value={business} onChange={setBusiness} hint="Stock, goods for trade" />
          <Field label="Receivable Debts ($)" value={receivables} onChange={setReceivables} hint="Money owed to you" />
        </div>
        <div className="divider pt-2" />
        <Field label="Liabilities ($)" value={liabilities} onChange={setLiabilities} hint="Subtract current debts" />
      </div>

      <button onClick={() => setCalculated(true)} className="btn-primary w-full py-3 text-base">
        Calculate Zakat
      </button>

      {calculated && (
        <div className={cn("card p-6 space-y-4 border-2", zakatDue ? "border-[var(--primary)]" : "border-[var(--border)]")}>
          <h2 className="section-title">Your Zakat Result</h2>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="card p-3"><p className="text-[var(--text-muted)] text-xs mb-1">Total Assets</p><p className="font-bold text-[var(--text)]">${totalAssets.toFixed(2)}</p></div>
            <div className="card p-3"><p className="text-[var(--text-muted)] text-xs mb-1">Liabilities</p><p className="font-bold text-[var(--text)]">-${liabilities.toFixed(2)}</p></div>
            <div className="card p-3"><p className="text-[var(--text-muted)] text-xs mb-1">Net Zakatable Wealth</p><p className="font-bold text-[var(--primary)]">${netWorth.toFixed(2)}</p></div>
            <div className="card p-3"><p className="text-[var(--text-muted)] text-xs mb-1">Nisab Threshold</p><p className="font-bold text-[var(--text)]">${nisabValue.toFixed(2)}</p></div>
          </div>

          {zakatDue ? (
            <div className="bg-[var(--primary)]/10 border border-[var(--primary)]/30 rounded-xl p-5 text-center">
              <p className="text-lg font-semibold text-[var(--primary)] mb-1">Zakat is Due ✓</p>
              <p className="text-3xl font-bold text-[var(--text)]">${zakatAmount.toFixed(2)}</p>
              <p className="text-sm text-[var(--text-muted)] mt-1">2.5% of ${netWorth.toFixed(2)}</p>
            </div>
          ) : (
            <div className="bg-[var(--elevated)] rounded-xl p-5 text-center">
              <p className="text-lg font-semibold text-[var(--text-muted)]">Zakat Not Due</p>
              <p className="text-sm text-[var(--text-muted)] mt-1">Your wealth is below the Nisab threshold of ${nisabValue.toFixed(2)}</p>
            </div>
          )}
        </div>
      )}

      <p className="text-xs text-[var(--text-muted)] text-center">
        Gold/silver prices are approximate. Consult a scholar for personal guidance.
      </p>
    </div>
  );
}
