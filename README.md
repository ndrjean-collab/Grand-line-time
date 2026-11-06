# Grand Line Time

Vitrine statique d’une maison de pièces automobiles neuves, livrées en Europe depuis le stock de la société ou directement par un partenaire. Le site est en français par défaut, avec un sélecteur FR / EN / DE / ES / IT.

**Ceci est une démonstration.** Les pièces, prix, stocks, délais et compatibilités sont fictifs. Aucun montage réel n’est annoncé. Aucun paiement n’est encaissé. Le nom de domaine envisagé, `grandlinetime.com`, n’est pas encore enregistré.

## Lancer en local

```bash
npm install
npm run dev
```

Le site s’ouvre sur `http://localhost:5173`.

```bash
npm run build      # vérifie le catalogue, typecheck, export statique dans dist/
npm run preview    # sert dist/
```

## Déployer

Le build par défaut utilise la racine `/`. Il convient à Vercel, Netlify et à un domaine personnalisé.

- **Vercel** — importer le dépôt. `vercel.json` renvoie toutes les routes vers `index.html`.
- **Netlify** — `netlify.toml` publie `dist` et fait la même redirection.
- **GitHub Pages** — le workflow `.github/workflows/deploy-pages.yml` part à chaque push sur `main`. Il construit avec `VITE_BASE_PATH=/Grand-line-time/` (site de projet). Il faut activer Pages → Source : GitHub Actions. L’adresse sera `https://ndrjean-collab.github.io/Grand-line-time/`.

Pour un domaine à la racine (Vercel, Netlify ou GitHub Pages avec domaine personnalisé), construire **sans** `VITE_BASE_PATH`.

Le site est en `noindex` (`index.html` et `public/robots.txt`) tant que le catalogue de démonstration est en ligne. Retirer ces deux garde-fous au moment du vrai catalogue.

## Ce qui est encore un placeholder

Ne pas inventer ces informations. Les remplacer dans les pages Mentions légales, Contact, CGV, Confidentialité, Retours et dans le pied de page :

- `[RAISON SOCIALE]`, `[FORME JURIDIQUE]`, `[CAPITAL SOCIAL]`
- `[ADRESSE]`, `[CODE POSTAL]`, `[VILLE]`, `[PAYS]`
- `[RCS]`, `[SIREN]`, `[NUMÉRO TVA]`
- `[EMAIL]`, `[TÉLÉPHONE]`
- `[DIRECTEUR DE LA PUBLICATION]`
- `[HÉBERGEUR]` et son adresse, selon l’hébergeur retenu
- `[ADRESSE DE RETOUR]`
- `[MÉDIATEUR DE LA CONSOMMATION]`

Les textes légaux sont des modèles. Les faire relire par un conseil avant toute vente.

## Catalogue

`src/data/products.json` contient 30 produits exemple (`demo: true`, références `GLT-DEMO-…`, OEM `EX-OEM-…`). Les véhicules de `src/data/vehicles.json` sont des marques fictives (Horizon, Rivage, Sommet, Traversée). `npm run check` refuse un produit sans mention de démonstration ou avec une compatibilité inconnue.

Les illustrations sont des SVG d’origine, dans `src/components/PartArt.tsx`. Aucune image distante.

## Aller plus loin

1. Acheter `grandlinetime.com` et le pointer vers Vercel, Netlify ou GitHub Pages.
2. Brancher le paiement : Shopify (catalogue, stock, paiement, taxes) ou un checkout Stripe sur cette vitrine. La page `/commande` est prévue pour être remplacée.
3. Remplacer le JSON par un flux fournisseur. Pour de vraies compatibilités, prévoir une licence TecDoc (ou équivalent) : ne jamais publier les correspondances de démonstration comme des montages réels.
4. TVA européenne : immatriculation au guichet unique (OSS) afin d’appliquer le taux du pays de livraison. Le taux de 20 % affiché ici n’illustre que la France métropolitaine.
5. Retirer le bandeau de démonstration, le `noindex` et les prix d’exemple lorsque les données réelles sont en place.
