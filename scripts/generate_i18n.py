#!/usr/bin/env python3
"""Generate localized i18n JSON files from en.json structure."""
import json
import copy
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
I18N = ROOT / "i18n"

with open(I18N / "en.json", encoding="utf-8") as f:
    EN = json.load(f)


def set_path(obj, path, value):
    cur = obj
    parts = path.split(".")
    for p in parts[:-1]:
        if p.endswith("]"):
            name, idx = p[:-1].split("[")
            cur = cur[name][int(idx)]
        else:
            cur = cur[p]
    last = parts[-1]
    if last.endswith("]"):
        name, idx = last[:-1].split("[")
        cur[name][int(idx)] = value
    else:
        cur[last] = value


def flatten(obj, prefix=""):
    out = {}
    if isinstance(obj, dict):
        for k, v in obj.items():
            p = f"{prefix}.{k}" if prefix else k
            out.update(flatten(v, p))
    elif isinstance(obj, list):
        for i, v in enumerate(obj):
            out.update(flatten(v, f"{prefix}[{i}]"))
    else:
        out[prefix] = obj
    return out


EN_FLAT = flatten(EN)

# Translations keyed by dot-path (same keys as en.json)
TR = {
    "meta.home.title": "Cognethra — Bilişsel Zeka Mimarisi",
    "meta.home.description": "Cognethra, SOVRA / Entelekron ekosisteminde akıl yürütme, bilgi sentezi, anlamsal bellek, Proof-of-Thought sistemleri ve yapay zeka destekli biliş için bilişsel zeka mimarisidir.",
    "meta.home.keywords": "Cognethra, bilişsel zeka, akıl yürütme mimarisi, bilgi sentezi, anlamsal bellek, Proof-of-Thought, SOVRA, Entelekron, TVK ekosistemi",
    "meta.home.ogTitle": "Cognethra — Bilişsel Zeka Mimarisi",
    "meta.home.ogDescription": "Akıl yürütme, bellek grafikleri, Proof-of-Thought sistemleri ve SOVRA bağlantılı yapay zeka bilişi için bilişsel zeka katmanı.",
    "meta.home.twitterTitle": "Cognethra — Bilişsel Zeka Mimarisi",
    "meta.home.twitterDescription": "Egemen yapay zeka için kurumsal bilişsel zeka: SOVRA / Entelekron ekosisteminde akıl yürütme, bellek, kanıt ve ajan bilişi.",
    "meta.privacy.title": "Gizlilik Politikası — Cognethra",
    "meta.privacy.description": "Cognethra gizlilik politikasını okuyun. T.V.K. Labs & Technologies LTD'nin www.cognethra.org ve Cognethra mobil web uygulaması için verileri nasıl işlediğini öğrenin.",
    "meta.privacy.keywords": "Cognethra gizlilik politikası, veri koruma, TVK Labs",
    "meta.privacy.ogTitle": "Gizlilik Politikası — Cognethra",
    "meta.privacy.ogDescription": "Cognethra'nın web sitesi ve kurulabilir uygulama genelinde bilgi, çerezler, yerel depolama ve iletişim verilerini nasıl yönettiği.",
    "meta.privacy.twitterTitle": "Cognethra Gizlilik Politikası",
    "meta.privacy.twitterDescription": "Cognethra bilişsel zeka platformu ve mobil web uygulaması için gizlilik politikası.",
    "meta.terms.title": "Hizmet Şartları — Cognethra",
    "meta.terms.description": "Bilişsel zeka platformunu ve mobil uygulamayı kullanan araşt\ştırmacılar, ortaklar ve ziyaretçiler için Cognethra hizmet şartları.",
    "meta.terms.keywords": "Cognethra hizmet şartları, platform şartları, TVK Labs",
    "meta.terms.ogTitle": "Hizmet Şartları — Cognethra",
    "meta.terms.ogDescription": "Cognethra web sitesi, uygulaması ve araştırma platformu materyallerinin kullanımını düzenleyen şartlar.",
    "meta.terms.twitterTitle": "Cognethra Hizmet Şartları",
    "meta.terms.twitterDescription": "Cognethra bilişsel zeka mimarisi platformu için hizmet şartları.",
    "meta.disclaimer.title": "Sorumluluk Reddi — Cognethra",
    "meta.disclaimer.description": "Cognethra sorumluluk reddi ve risk açıklaması. Araştırma aşamasındaki bilişsel yapay zeka altyapısı — tıbbi veya klinik tavsiye değildir.",
    "meta.disclaimer.keywords": "Cognethra sorumluluk reddi, risk açıklaması, bilişsel yapay zeka",
    "meta.disclaimer.ogTitle": "Sorumluluk Reddi — Cognethra",
    "meta.disclaimer.ogDescription": "Cognethra araştırma durumu, tıbbi olmayan kullanım ve ekosistem referansları hakkında önemli uyarılar.",
    "meta.disclaimer.twitterTitle": "Cognethra Sorumluluk Reddi",
    "meta.disclaimer.twitterDescription": "Cognethra bilişsel zeka platformu için sorumluluk reddi ve risk açıklaması.",
    "meta.app.title": "Cognethra Bilişsel Zeka Uygulaması",
    "meta.app.description": "Mobilde çalışma zamanı önizlemesi, anlamsal bellek bağlamı, araştırma erişimi ve SOVRA / Entelekron ekosistem gezintisi için Cognethra uygulamasını yükleyin.",
    "meta.app.keywords": "Cognethra uygulaması, bilişsel zeka uygulaması, PWA, SOVRA, Entelekron",
    "meta.app.ogTitle": "Cognethra Bilişsel Zeka Uygulaması",
    "meta.app.ogDescription": "Çalışma zamanı önizlemesi, bellek bağlamı ve araştırma ağı erişimi sunan mobil bilişsel zeka portalı.",
    "meta.app.twitterTitle": "Cognethra Uygulaması",
    "meta.app.twitterDescription": "Mobil komut ve araştırma erişimi için kurulabilir Cognethra bilişsel zeka uygulaması.",
    "meta.blog.title": "Cognethra Bilişsel Mimarisi Tanıtımı — Cognethra Blog",
    "meta.blog.description": "Cognethra bilişsel zeka mimarisine genel bakış: akıl yürütme katmanları, anlamsal bellek, Proof-of-Thought ve SOVRA ekosistem entegrasyonu.",
    "meta.blog.keywords": "Cognethra mimarisi, bilişsel yapay zeka, bilgi sentezi, Proof-of-Thought, blog",
    "meta.blog.ogTitle": "Cognethra Bilişsel Mimarisi Tanıtımı",
    "meta.blog.ogDescription": "Cognethra'nın SOVRA / Entelekron ekosisteminde akıl yürütme, bellek, kanıt ve ajan bilişini nasıl birleştirdiğini öğrenin.",
    "meta.blog.twitterTitle": "Cognethra Bilişsel Mimarisi Genel Bakış",
    "meta.blog.twitterDescription": "Cognethra bilişsel zeka katmanları ve ekosistem entegrasyonunun teknik genel bakışı.",
    "nav.about": "Hakkında",
    "nav.capabilities": "Yetenekler",
    "nav.architecture": "Mimari",
    "nav.ecosystem": "Ekosistem",
    "nav.useCases": "Kullanım Alanları",
    "nav.roadmap": "Yol Haritası",
    "nav.faq": "SSS",
    "nav.blog": "Blog",
    "nav.getApp": "Uygulamayı Al",
    "nav.contact": "İletişim",
    "nav.home": "Ana Sayfa",
    "nav.app": "Uygulama",
    "nav.privacy": "Gizlilik",
    "nav.terms": "Şartlar",
    "nav.disclaimer": "Sorumluluk Reddi",
    "nav.openMenu": "Menüyü aç",
    "nav.primaryNav": "Ana navigasyon",
    "nav.brandHome": "Cognethra ana sayfa",
    "nav.language": "Dil",
    "nav.selectLanguage": "Dil seçin",
    "hero.eyebrow": "Bilişsel Zeka · SOVRA / Entelekron Ekosistemi",
    "hero.title": "Cognethra",
    "hero.subtitle": "Bilişsel Zeka Mimarisi",
    "hero.lead": "Cognethra, SOVRA / Entelekron ekosistemindeki gelişmiş bilişsel zeka kardeş mimarisidir — bilgi sentezi, akıl yürütme zincirleri, anlamsal bellek, Proof-of-Thought sistemleri ve yapay zeka destekli karar zekası için tasarlanmıştır.",
    "hero.supporting": "Akıl Yürütme Motoru · Bilgi Sentezi · Anlamsal Bellek · Proof-of-Thought · Ajan Bilişi",
    "hero.disclosure": "Cognethra bir bilişsel yapay zeka altyapısı konseptidir. Tıbbi tavsiye veya klinik nöroteknoloji ürünü değildir. Gelecekteki bilişsel geliştirme uygulamaları uzman incelemesi, etik kontroller, onay ve yasal uyumluluk gerektirir.",
    "hero.explore": "Cognethra'yı Keşfedin",
    "hero.architectureBtn": "Mimari",
    "hero.getApp": "Uygulamayı Al",
    "hero.runtimePreview": "Bilişsel zeka çalışma zamanı önizlemesi",
    "hero.cognitiveRuntime": "Bilişsel Çalışma Zamanı",
    "hero.devPreview": "Geliştirme Önizlemesi",
    "hero.reasoningGraph": "Akıl Yürütme Grafiği",
    "hero.memoryContext": "Bellek Bağlamı",
    "hero.thoughtProofs": "Düşünce Kanıtları",
    "hero.learningTimeline": "Öğrenme Zaman Çizelgesi",
    "hero.cognitiveLayer": "Bilişsel Katman · SOVRA Ajanları · Bilgi Sentezi",
    "hero.entities": "Varlıklar",
    "hero.events": "Olaylar",
    "hero.reasoning": "Akıl Yürütme",
    "hero.memory": "Bellek",
    "hero.governance": "Yönetişim",
    "stage.title": "Geliştirme Aşaması",
    "stage.text": "Cognethra şu anda SOVRA / Entelekron / TVK yığını içinde araştırma, mimari oluşturma ve ekosistem entegrasyonu hazırlığı aşamasındadır.",
    "about.featuredTitle": "Cognethra ham bilgiyi yapılandırılmış bilişe dönüştürür.",
    "about.featuredText": "Yapay zeka ajanlarının ve insan odaklı sistemlerin bilgi üzerinde akıl yürütmesine, bağlamı hatırlamasına, kararları değerlendirmesine ve açıklanabilir zeka üretmesine yardımcı olmak için tasarlanmıştır.",
    "about.sisterTitle": "Cerebthra'nın kardeş mimarisi",
    "about.sisterText": "Cerebthra temel bilişsel zeka mimarisine odaklanır. Cognethra bu vizyonu bilgi sentezi, bellek, düşünce doğrulama ve operasyonel akıl yürütme iş akışlarına genişletir.",
    "capabilities.kicker": "Temel Yetenekler",
    " contents truncated for brevity in thinking...
}
