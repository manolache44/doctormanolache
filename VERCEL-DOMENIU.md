# Cum configurezi domeniul doctormanolache.com pe Vercel

## 1. Proiectul pe Vercel

- Dacă nu ai făcut deploy încă: intră pe [vercel.com](https://vercel.com), loghează-te (sau cu GitHub), apasă **Add New** → **Project** și importă proiectul (din GitHub/GitLab/Bitbucket sau **Import** cu drag & drop / CLI).
- Dacă proiectul e deja pe Vercel: deschide-l din dashboard.

---

## 2. Adaugă domeniul custom

1. În proiectul tău pe Vercel, mergi la **Settings** → **Domains** (sau **Project Settings** → **Domains**).
2. La **Add**, scrie: **doctormanolache.com** și apasă **Add**.
3. (Opțional) Adaugă și **www.doctormanolache.com** dacă vrei să funcționeze cu www.

Vercel îți va arăta ce înregistrări DNS trebuie să pui la furnizorul de domeniu.

---

## 3. Configurează DNS la furnizorul de domeniu

Unde ai cumpărat domeniul (GoDaddy, Namecheap, Google Domains, etc.) trebuie să setezi înregistrările pe care le dă Vercel. De obicei sunt:

### Varianta A – folosești nameserver-ele Vercel (recomandat)

- Vercel îți dă 2 nameserver-e, de tip:
  - `ns1.vercel-dns.com`
  - `ns2.vercel-dns.com`
- La furnizorul de domeniu, la **DNS** / **Nameservers**, schimbă la „Custom” sau „Use custom nameservers” și pune exact aceste două.
- Salvează. După 5–30 min (uneori până la 24 h) domeniul va rezolva către Vercel.

### Varianta B – lași nameserver-ele furnizorului și adaugi doar înregistrări

- La furnizorul de domeniu, în zona DNS, adaugi:

| Tip   | Nume / Host     | Valoare / Target                    |
|-------|------------------|-------------------------------------|
| **A** | `@` (sau gol)   | `76.76.21.21`                       |
| **CNAME** | `www`       | `cname.vercel-dns.com`              |

- Pentru **doctormanolache.com** (fără www) trebuie să ai A record cu `76.76.21.21` (IP-ul Vercel se poate schimba – verifică în Vercel → Domains ce IP îți arată ei).
- Pentru **www.doctormanolache.com**: CNAME `www` → `cname.vercel-dns.com`.

Valorile exacte le vezi în Vercel, la **Domains**, după ce adaugi domeniul.

---

## 4. SSL (HTTPS)

- După ce DNS-ul e corect, Vercel pune automat certificat SSL (Let’s Encrypt) pentru **https://doctormanolache.com**.
- Poate dura câteva minute. În **Domains** va apărea un căsuță verde când e gata.

---

## 5. Redirect www → non-www (sau invers)

- În **Vercel** → **Domains** poți seta care variantă e principală (ex. doctormanolache.com) și că celelalte (www) să redirecționeze către ea.

---

## Rezumat

| Pas | Unde | Ce faci |
|-----|------|--------|
| 1 | Vercel → Project → Settings → Domains | Adaugi **doctormanolache.com** (și eventual **www.doctormanolache.com**) |
| 2 | Site-ul unde ai cumpărat domeniul → DNS / Nameservers | Fie pui nameserver-ele Vercel, fie adaugi A + CNAME cum îți arată Vercel |
| 3 | Aștepți 5–30 min | DNS se propagă, Vercel activează SSL |
| 4 | Browser | Deschizi https://doctormanolache.com și verifici site-ul |

Dacă îmi spui la ce furnizor ai domeniul (ex. GoDaddy, Namecheap), pot detalia exact unde apesi și ce copiezi.
