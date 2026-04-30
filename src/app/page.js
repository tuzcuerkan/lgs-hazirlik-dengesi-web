"use client";

import { useState } from "react";

const subjects = [
  { name: "Türkçe", value: 80, target: 140 },
  { name: "Matematik", value: 180, target: 160 },
  { name: "Fen Bilimleri", value: 95, target: 140 },
  { name: "İnkılap Tarihi", value: 40, target: 70 },
  { name: "Din Kültürü", value: 35, target: 70 },
  { name: "İngilizce", value: 50, target: 70 },
];

const recommendations = [
  "Türkçe paragraf çalışmaları haftalık plana düzenli eklenmelidir.",
  "Fen Bilimleri için kısa konu tekrarı ve hedefli soru çözümü önerilir.",
  "Matematik çalışma miktarı güçlüdür, yanlış analiziyle desteklenmelidir.",
];

const roadmap = [
  "Deneme sınavı fotoğrafından otomatik sonuç okuma",
  "Yapay zeka destekli kişisel motivasyon mesajları",
  "Öğretmen için konu bazlı tekrar planı önerisi",
  "Öğrencinin uzun dönemli net gelişim tahmini",
  "Veli için haftalık destek mesajları",
  "Rehberlik servisi için stres ve risk takip ekranı",
];

export default function Home() {
  const [activePanel, setActivePanel] = useState("student");

  const totalQuestions = subjects.reduce((sum, item) => sum + item.value, 0);
  const strongest = subjects.reduce((best, item) =>
    item.value > best.value ? item : best
  );
  const weakest = subjects.reduce((low, item) =>
    item.value < low.value ? item : low
  );

  return (
    <main className="min-h-screen bg-[#EEF4FF] text-slate-900">
      <div className="mx-auto flex max-w-7xl gap-6 px-5 py-6">
        <aside className="hidden w-72 shrink-0 rounded-[32px] bg-[#0F2F5F] p-6 text-white shadow-2xl lg:block">
          <div className="mb-8 rounded-full bg-blue-100 px-4 py-2 text-sm font-black text-[#0F2F5F]">
            Samsun Kampüsü
          </div>

          <h1 className="text-3xl font-black leading-tight">
            LGS Hazırlık Dengesi
          </h1>

          <p className="mt-4 text-sm leading-6 text-blue-100">
            Öğrenci, veli ve öğretmenler için soru çözme ve ders çalışma
            dengesini takip eden web paneli.
          </p>

          <nav className="mt-8 space-y-3">
            <PanelButton
              label="Öğrenci Paneli"
              active={activePanel === "student"}
              onClick={() => setActivePanel("student")}
            />
            <PanelButton
              label="Veli Paneli"
              active={activePanel === "parent"}
              onClick={() => setActivePanel("parent")}
            />
            <PanelButton
              label="Öğretmen Paneli"
              active={activePanel === "teacher"}
              onClick={() => setActivePanel("teacher")}
            />
            <PanelButton
              label="Geliştirme Planı"
              active={activePanel === "roadmap"}
              onClick={() => setActivePanel("roadmap")}
            />
          </nav>

          <div className="mt-8 rounded-3xl border border-blue-300/30 bg-white/10 p-4">
            <p className="text-xs font-bold uppercase tracking-wide text-blue-100">
              OBİT 2026 Demo Sürümü
            </p>
            <p className="mt-2 text-sm leading-6 text-blue-50">
              İlk sürüm örnek verilerle çalışmaktadır. Gerçek hesap sistemi ve
              gelişmiş analizler hazırlık aşamasındadır.
            </p>
          </div>
        </aside>

        <section className="flex-1">
          <header className="mb-6 rounded-[32px] border border-blue-100 bg-white p-6 shadow-xl">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="mb-2 inline-flex rounded-full bg-blue-100 px-4 py-2 text-sm font-black text-blue-900">
                  Samsun Kampüsü • OBİT 2026 Demo Sürümü
                </p>

                <h2 className="text-3xl font-black tracking-tight text-slate-950 lg:text-4xl">
                  Proje | LGS Hazırlık Dengesi
                </h2>

                <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
                  Öğrenci, veli ve öğretmenler için LGS soru çözme, deneme sonucu,
                  motivasyon ve ders yükü verilerini birlikte analiz eden web paneli.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:w-[520px]">
                <MiniStat label="Haftalık Soru" value={totalQuestions} />
                <MiniStat label="Güçlü Ders" value={strongest.name} />
                <MiniStat label="Desteklenecek Ders" value="Türkçe" />
                <MiniStat label="Genel Durum" value="Dikkat" />
              </div>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-3 lg:hidden">
              <PanelButton
                label="Öğrenci"
                active={activePanel === "student"}
                onClick={() => setActivePanel("student")}
                mobile
              />
              <PanelButton
                label="Veli"
                active={activePanel === "parent"}
                onClick={() => setActivePanel("parent")}
                mobile
              />
              <PanelButton
                label="Öğretmen"
                active={activePanel === "teacher"}
                onClick={() => setActivePanel("teacher")}
                mobile
              />
              <PanelButton
                label="Geliştirme"
                active={activePanel === "roadmap"}
                onClick={() => setActivePanel("roadmap")}
                mobile
              />
            </div>
          </header>

          {activePanel === "student" && (
            <StudentPanel weakest={weakest} totalQuestions={totalQuestions} />
          )}

          {activePanel === "parent" && <ParentPanel weakest={weakest} />}

          {activePanel === "teacher" && <TeacherPanel />}

          {activePanel === "roadmap" && <RoadmapPanel />}
        </section>
      </div>
    </main>
  );
}

function PanelButton({ label, active, onClick, mobile }) {
  return (
    <button
      onClick={onClick}
      className={`w-full rounded-2xl px-4 py-3 text-left text-sm font-black transition ${
        active
          ? "bg-blue-600 text-white shadow-lg shadow-blue-700/20"
          : mobile
          ? "bg-white text-slate-700 ring-1 ring-blue-100"
          : "bg-white/10 text-blue-50 hover:bg-white/20"
      }`}
    >
      {label}
    </button>
  );
}

function MiniStat({ label, value }) {
  return (
    <div className="rounded-2xl border border-blue-100 bg-[#F8FBFF] p-4">
      <div className="text-lg font-black text-blue-700">{value}</div>
      <div className="mt-1 text-xs font-black text-slate-500">{label}</div>
    </div>
  );
}

function StudentPanel({ weakest, totalQuestions }) {
  return (
    <div className="space-y-6">
      <div className="grid gap-5 lg:grid-cols-3">
        <InfoCard
          title="Öğrenci Genel Durumu"
          text={`Bu hafta toplam ${totalQuestions} soru çözülmüştür. Matematik çalışma miktarı güçlü, ${weakest.name} çalışmaları ise desteklenmelidir.`}
        />
        <InfoCard
          title="Bugünkü Çalışma Önerisi"
          text="Türkçe için 15 paragraf sorusu, Fen Bilimleri için 20 dakika konu tekrarı ve 10 soru önerilir."
        />
        <InfoCard
          title="LGS Denge Yorumu"
          text="Öneriler LGS soru ağırlığı, haftalık çalışma dengesi, yanlış oranı, günlük yük ve motivasyon durumuna göre hazırlanır."
        />
      </div>

      <section className="rounded-[32px] border border-blue-100 bg-white p-6 shadow-xl">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-black">Derslere Göre Soru Dağılımı</h3>
            <p className="mt-1 text-sm text-slate-600">
              Haftalık örnek veri setiyle oluşturulmuş demo rapor.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {subjects.map((subject) => (
            <BarRow key={subject.name} subject={subject} />
          ))}
        </div>
      </section>

      <section className="rounded-[32px] border border-blue-100 bg-white p-6 shadow-xl">
        <h3 className="text-2xl font-black">Denge Uyarıları</h3>
        <div className="mt-4 grid gap-4 lg:grid-cols-3">
          {recommendations.map((item) => (
            <div
              key={item}
              className="rounded-3xl border border-blue-100 bg-[#F8FBFF] p-5"
            >
              <p className="text-sm font-bold leading-6 text-slate-700">
                {item}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function ParentPanel({ weakest }) {
  return (
    <div className="grid gap-5 lg:grid-cols-2">
      <InfoCard
        title="Veli Destek Özeti"
        text={`Öğrenci bu hafta genel olarak düzenli çalışmıştır. ${weakest.name} çalışmaları kısa ve düzenli tekrarlarla desteklenebilir.`}
      />
      <InfoCard
        title="Aşırı Yüklenme Durumu"
        text="Bu hafta aşırı yüklenme riski düşük görünmektedir. Öğrencinin kısa molalarla çalışması desteklenebilir."
      />
      <InfoCard
        title="Panelin Amacı"
        text="Bu panel öğrenciyi kıyaslamak için değil, sağlıklı ve sürdürülebilir çalışma düzenini desteklemek için tasarlanmıştır."
      />
      <InfoCard
        title="Hazırlık Aşamasında"
        text="Bu bölümde velilere öğrenciyi baskılamadan destekleyebilecek haftalık bilgilendirme mesajları sunulması planlanmaktadır."
      />
    </div>
  );
}

function TeacherPanel() {
  return (
    <div className="space-y-6">
      <div className="grid gap-5 lg:grid-cols-4">
        <MiniStat label="Öğrenci Sayısı" value="24" />
        <MiniStat label="Ortalama Soru" value="480" />
        <MiniStat label="Zorlanılan Ders" value="Türkçe" />
        <MiniStat label="Genel Durum" value="Dikkat" />
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <InfoCard
          title="Anonim Sınıf Yorumu"
          text="8. sınıf genelinde Türkçe paragraf ve Fen Bilimleri çalışmalarında dengesizlik görülmektedir. Bu alanlarda kısa tekrar ve düzenli soru çözme çalışmaları planlanabilir."
        />
        <InfoCard
          title="Gizlilik Notu"
          text="Bu panelde öğrencilerin kişisel bilgileri gösterilmez. Veriler sınıf geneli ve anonim olarak sunulur."
        />
        <InfoCard
          title="Rehberlik Gözlemi"
          text="Motivasyon düşüklüğü ve yorgunluk bildirimi olan öğrenciler sınıf geneli oranlarla izlenir. Kişisel takip ekranı hazırlık aşamasındadır."
        />
        <InfoCard
          title="Hazırlık Aşamasında"
          text="Konu bazlı ayrıntılı sınıf analizi, öğretmen için tekrar planı önerisi ve rehberlik servisi için stres takip ekranı planlanmaktadır."
        />
      </div>
    </div>
  );
}

function RoadmapPanel() {
  return (
    <section className="rounded-[32px] border border-blue-100 bg-white p-6 shadow-xl">
      <h3 className="text-2xl font-black">Geliştirme Planı</h3>
      <p className="mt-2 text-sm leading-6 text-slate-600">
        Bu özellikler projenin sonraki aşamalarında geliştirilmek üzere
        planlanmıştır.
      </p>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        {roadmap.map((item) => (
          <div
            key={item}
            className="rounded-3xl border border-blue-100 bg-[#F8FBFF] p-5"
          >
            <div className="mb-2 inline-flex rounded-full bg-orange-100 px-3 py-1 text-xs font-black text-orange-700">
              Hazırlık aşamasında
            </div>
            <p className="text-sm font-bold leading-6 text-slate-700">
              {item}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

function InfoCard({ title, text }) {
  return (
    <div className="rounded-[28px] border border-blue-100 bg-white p-6 shadow-xl">
      <h3 className="text-xl font-black text-slate-950">{title}</h3>
      <p className="mt-3 text-sm leading-6 text-slate-600">{text}</p>
    </div>
  );
}

function BarRow({ subject }) {
  const percent = Math.min(100, Math.round((subject.value / subject.target) * 100));

  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <div className="font-black text-slate-800">{subject.name}</div>
        <div className="text-sm font-black text-slate-500">
          {subject.value} soru
        </div>
      </div>
      <div className="h-4 overflow-hidden rounded-full bg-slate-200">
        <div
          className="h-full rounded-full bg-blue-600"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}