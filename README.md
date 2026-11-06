# Grand Line Time

Vitrine statique d’une maison de pièces automobiles neuves, livrées en Europe depuis le stock de la société ou directement par un partenaire. Le site est en français par défaut, avec un sélecteur FR / EN / DE / ES / IT.

**Ceci est une démonstration.** Les pièces, prix, stocks, délais et compatibilités sont fictifs. Aucun montage réel n’est annoncé. Aucun paiement n’est encaissé. Le site public est [grandlinetime.com](https://grandlinetime.com).

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
- **GitHub Pages** — le workflow `.github/workflows/deploy-pages.yml` part à chaque push sur `main`. Le build est à la racine (`/`, sans `VITE_BASE_PATH`) pour le domaine `grandlinetime.com` (`public/CNAME`). Source Pages : GitHub Actions. Les routes profondes retombent sur `404.html`, copie de `index.html`.

Vercel et Netlify utilisent le même build à la racine.

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

1. Chez le registrar (Spaceship), faire pointer `grandlinetime.com` vers GitHub Pages : enregistrements A `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`, AAAA `2606:50c0:8000::153`, `2606:50c0:8001::153`, `2606:50c0:8002::153`, `2606:50c0:8003::153`, et `www` en CNAME vers `ndrjean-collab.github.io`.
2. Brancher le paiement : Shopify (catalogue, stock, paiement, taxes) ou un checkout Stripe sur cette vitrine. La page `/commande` est prévue pour être remplacée.
3. Remplacer le JSON par un flux fournisseur. Pour de vraies compatibilités, prévoir une licence TecDoc (ou équivalent) : ne jamais publier les correspondances de démonstration comme des montages réels.
4. TVA européenne : immatriculation au guichet unique (OSS) afin d’appliquer le taux du pays de livraison. Le taux de 20 % affiché ici n’illustre que la France métropolitaine.
5. Retirer le bandeau de démonstration, le `noindex` et les prix d’exemple lorsque les données réelles sont en place.
