import type { L10n } from '../types'

const L = (fr: string, en: string, de: string, es: string, it: string): L10n => ({ fr, en, de, es, it })

export type Block =
  | { kind: 'h2'; text: L10n; id?: string }
  | { kind: 'p'; text: L10n }
  | { kind: 'ul'; items: L10n[] }
  | { kind: 'callout'; text: L10n; id?: string }
  | { kind: 'eu' }
  | { kind: 'table'; caption: L10n; headers: L10n[]; rows: L10n[][] }

export interface InfoDoc {
  title: L10n
  lede: L10n
  blocks: Block[]
}

const review = L(
  'Texte modèle, à faire relire par un conseil avant toute mise en vente. Les crochets signalent les informations encore inconnues : elles ne doivent pas être inventées.',
  'Draft text. Have it reviewed by counsel before any sale. Brackets mark details that are still unknown and must not be invented.',
  'Mustertext. Vor jedem Verkauf juristisch prüfen lassen. Eckige Klammern markieren noch unbekannte Angaben, die nicht erfunden werden dürfen.',
  'Texto modelo. Hágalo revisar por un asesor antes de cualquier venta. Los corchetes marcan datos aún desconocidos: no deben inventarse.',
  'Testo modello. Fatelo rivedere da un legale prima di qualsiasi vendita. Le parentesi quadre segnano dati ancora sconosciuti: non vanno inventati.',
)

export const aboutDoc: InfoDoc = {
  title: L('À propos', 'About', 'Über uns', 'Nosotros', 'Chi siamo'),
  lede: L(
    'Grand Line Time prépare une maison de pièces automobiles neuves, depuis la France, pour les conducteurs de toute l’Europe.',
    'Grand Line Time is preparing a house of new automotive parts, from France, for drivers across Europe.',
    'Grand Line Time bereitet ein Haus für neue Fahrzeugteile vor, von Frankreich aus, für Fahrer in ganz Europa.',
    'Grand Line Time prepara una casa de recambios nuevos, desde Francia, para quienes conducen en toda Europa.',
    'Grand Line Time prepara una casa di ricambi nuovi, dalla Francia, per chi guida in tutta Europa.',
  ),
  blocks: [
    {
      kind: 'p',
      text: L(
        'Le nom relie la route et le moment : la ligne à suivre, et le temps juste pour recevoir la pièce. Toutes les familles y ont leur place, des plaquettes à l’éclairage, pour toutes les marques, en pièces neuves.',
        'The name joins the road and the moment: the line to follow, and the right time for the part to arrive. Every family belongs here, from pads to lighting, for every make, as new parts.',
        'Der Name verbindet die Strecke und den Zeitpunkt: die Linie, der man folgt, und die richtige Zeit für das Teil. Jede Familie hat hier ihren Platz, von Belägen bis zur Beleuchtung, für alle Marken, als Neuteile.',
        'El nombre une la ruta y el momento: la línea que seguir y el tiempo justo para recibir la pieza. Todas las familias tienen su lugar, de las pastillas a la iluminación, para todas las marcas, en recambio nuevo.',
        'Il nome unisce la strada e il momento: la linea da seguire e il tempo giusto per ricevere il ricambio. Ogni famiglia ha il suo posto, dalle pastiglie all’illuminazione, per tutti i marchi, come ricambio nuovo.',
      ),
    },
    {
      kind: 'h2',
      text: L('Deux façons d’expédier', 'Two ways to ship', 'Zwei Wege zu versenden', 'Dos formas de enviar', 'Due modi di spedire'),
    },
    {
      kind: 'p',
      text: L(
        'Une pièce peut partir du stock tenu par la société, ou être envoyée directement par un partenaire lorsque nous ne la tenons pas. La fiche le dit clairement, avec un badge « En stock » ou « Expédié par notre partenaire ».',
        'A part can leave stock held by the company, or be sent directly by a partner when we do not hold it. The sheet says so, with an “In stock” or “Shipped by our partner” badge.',
        'Ein Teil kann aus dem Lager der Gesellschaft kommen oder direkt von einem Partner gesendet werden, wenn wir es nicht führen. Die Seite sagt es deutlich, mit dem Hinweis „Auf Lager“ oder „Versand durch unseren Partner“.',
        'Una pieza puede salir del stock de la sociedad o enviarla directamente un socio cuando no la tenemos. La ficha lo dice con la etiqueta «En stock» o «Enviado por nuestro socio».',
        'Un ricambio può partire dallo stock della società o essere inviato direttamente da un partner quando non lo teniamo. La scheda lo dice con il badge «Disponibile» o «Spedito dal nostro partner».',
      ),
    },
    {
      kind: 'h2',
      id: 'demonstration',
      text: L('Cette vitrine est une démonstration', 'This storefront is a demonstration', 'Diese Vitrine ist eine Demonstration', 'Esta vitrina es una demostración', 'Questa vetrina è una dimostrazione'),
    },
    {
      kind: 'callout',
      text: L(
        'Les trente pièces, leurs prix, leurs stocks et leurs compatibilités sont fictifs. Aucun montage réel n’est garanti. Le paiement n’est pas branché. Le domaine grandlinetime.com est envisagé et n’est pas encore enregistré.',
        'The thirty parts, their prices, stock and fitment are fictional. No real installation is guaranteed. Payment is not connected. The domain grandlinetime.com is planned and is not registered yet.',
        'Die dreißig Teile, ihre Preise, Bestände und Passungen sind erfunden. Kein echter Einbau wird zugesichert. Die Zahlung ist nicht angebunden. Die Domain grandlinetime.com ist geplant und noch nicht registriert.',
        'Las treinta piezas, sus precios, stocks y compatibilidades son ficticios. No se garantiza ningún montaje real. El pago no está conectado. El dominio grandlinetime.com está previsto y aún no está registrado.',
        'I trenta ricambi, i prezzi, le disponibilità e le compatibilità sono fittizi. Nessun montaggio reale è garantito. Il pagamento non è collegato. Il dominio grandlinetime.com è previsto e non è ancora registrato.',
      ),
    },
    {
      kind: 'h2',
      text: L('Identité à compléter', 'Identity still to complete', 'Identität noch zu ergänzen', 'Identidad por completar', 'Identità da completare'),
    },
    {
      kind: 'ul',
      items: [
        L('Raison sociale : [RAISON SOCIALE]', 'Company name: [COMPANY NAME]', 'Firma: [FIRMENNAME]', 'Razón social: [RAZÓN SOCIAL]', 'Ragione sociale: [RAGIONE SOCIALE]'),
        L('Adresse : [ADRESSE]', 'Address: [ADDRESS]', 'Adresse: [ADRESSE]', 'Dirección: [DIRECCIÓN]', 'Indirizzo: [INDIRIZZO]'),
        L('Immatriculation : [RCS] — [SIREN]', 'Registration: [COMPANY REGISTER] — [SIREN]', 'Register: [HANDELSREGISTER] — [SIREN]', 'Registro: [REGISTRO] — [SIREN]', 'Registro: [REGISTRO] — [SIREN]'),
        L('TVA : [NUMÉRO TVA]', 'VAT: [VAT NUMBER]', 'USt-IdNr.: [UST-IDNR]', 'IVA: [NÚMERO IVA]', 'IVA: [PARTITA IVA]'),
        L('Contact : [EMAIL] — [TÉLÉPHONE]', 'Contact: [EMAIL] — [PHONE]', 'Kontakt: [EMAIL] — [TELEFON]', 'Contacto: [EMAIL] — [TELÉFONO]', 'Contatto: [EMAIL] — [TELEFONO]'),
      ],
    },
  ],
}

export const deliveryDoc: InfoDoc = {
  title: L('Livraison en Europe', 'Delivery in Europe', 'Lieferung in Europa', 'Entrega en Europa', 'Consegna in Europa'),
  lede: L(
    'Grand Line Time prépare des expéditions vers la France et les autres pays de l’Union européenne, depuis son stock ou directement par un partenaire.',
    'Grand Line Time is preparing shipments to France and the other countries of the European Union, from its own stock or directly by a partner.',
    'Grand Line Time bereitet Sendungen nach Frankreich und in die anderen Länder der Europäischen Union vor, aus eigenem Lager oder direkt durch einen Partner.',
    'Grand Line Time prepara envíos a Francia y al resto de la Unión Europea, desde su stock o directamente por un socio.',
    'Grand Line Time prepara spedizioni verso la Francia e gli altri paesi dell’Unione europea, dal proprio stock o direttamente da un partner.',
  ),
  blocks: [
    { kind: 'callout', text: review },
    {
      kind: 'h2',
      text: L('Zone', 'Area', 'Gebiet', 'Zona', 'Zona'),
    },
    {
      kind: 'p',
      text: L(
        'La livraison prévue couvre les 27 pays de l’Union européenne. Le Royaume-Uni, la Suisse et la Norvège pourront être ajoutés lorsque la logistique sera confirmée. Rien n’est ouvert à la commande tant que le paiement n’est pas branché.',
        'Planned delivery covers the 27 countries of the European Union. The United Kingdom, Switzerland and Norway can be added once logistics are confirmed. Nothing is open for order until payment is connected.',
        'Die geplante Lieferung umfasst die 27 Länder der Europäischen Union. Das Vereinigte Königreich, die Schweiz und Norwegen können folgen, sobald die Logistik feststeht. Bestellt werden kann nichts, solange die Zahlung nicht angebunden ist.',
        'La entrega prevista cubre los 27 países de la Unión Europea. El Reino Unido, Suiza y Noruega podrán añadirse cuando la logística esté confirmada. Nada está abierto a pedido mientras el pago no esté conectado.',
        'La consegna prevista copre i 27 paesi dell’Unione europea. Regno Unito, Svizzera e Norvegia potranno essere aggiunti quando la logistica sarà confermata. Nulla è ordinabile finché il pagamento non è collegato.',
      ),
    },
    { kind: 'eu' },
    {
      kind: 'h2',
      text: L('Deux circuits', 'Two routes', 'Zwei Wege', 'Dos circuitos', 'Due flussi'),
    },
    {
      kind: 'ul',
      items: [
        L(
          'En stock : départ du stock de la société. Délai de démonstration : 2 à 4 jours ouvrés.',
          'In stock: leaves company stock. Demonstration lead time: 2 to 4 working days.',
          'Auf Lager: Versand aus dem Lager der Gesellschaft. Demonstrationsfrist: 2 bis 4 Werktage.',
          'En stock: sale del stock de la sociedad. Plazo de demostración: 2 a 4 días laborables.',
          'Disponibile: parte dallo stock della società. Tempo dimostrativo: 2–4 giorni lavorativi.',
        ),
        L(
          'Partenaire : envoi direct chez vous. Délai de démonstration : 5 à 8 jours ouvrés. Le colis peut arriver séparément du reste de la commande.',
          'Partner: shipped straight to you. Demonstration lead time: 5 to 8 working days. The parcel may arrive separately from the rest of the order.',
          'Partner: Direktversand an Sie. Demonstrationsfrist: 5 bis 8 Werktage. Das Paket kann getrennt vom Rest der Bestellung ankommen.',
          'Socio: envío directo a su domicilio. Plazo de demostración: 5 a 8 días laborables. El paquete puede llegar aparte del resto del pedido.',
          'Partner: spedizione diretta a lei. Tempo dimostrativo: 5–8 giorni lavorativi. Il collo può arrivare separato dal resto dell’ordine.',
        ),
      ],
    },
    {
      kind: 'h2',
      text: L('Frais illustratifs, non contractuels', 'Illustrative fees, not a quote', 'Dargestellte Kosten, kein Angebot', 'Gastos ilustrativos, no contractuales', 'Costi illustrativi, non contrattuali'),
    },
    {
      kind: 'table',
      caption: L(
        'Grille d’exemple, à remplacer par les tarifs du transporteur.',
        'Example grid, to be replaced by the carrier’s rates.',
        'Beispielraster, zu ersetzen durch die Tarife des Transporteurs.',
        'Tabla de ejemplo, a sustituir por las tarifas del transportista.',
        'Griglia di esempio, da sostituire con le tariffe del corriere.',
      ),
      headers: [
        L('Zone', 'Zone', 'Zone', 'Zona', 'Zona'),
        L('Délai exemple', 'Example time', 'Beispielfrist', 'Plazo ejemplo', 'Tempo esempio'),
        L('Frais exemple TTC', 'Example fee incl. VAT', 'Beispielkosten inkl. MwSt.', 'Gasto ejemplo con IVA', 'Costo esempio IVA inclusa'),
      ],
      rows: [
        [
          L('France métropolitaine', 'Mainland France', 'Festlandfrankreich', 'Francia metropolitana', 'Francia metropolitana'),
          L('2 à 4 jours ouvrés si la pièce est en stock', '2 to 4 working days if the part is in stock', '2 bis 4 Werktage, wenn das Teil lagert', '2 a 4 días laborables si la pieza está en stock', '2–4 giorni lavorativi se il ricambio è disponibile'),
          L('6,90 €, offerts dès 120 € TTC — exemple', '€6.90, free from €120 incl. VAT — example', '6,90 €, frei ab 120 € inkl. MwSt. — Beispiel', '6,90 €, gratis desde 120 € con IVA — ejemplo', '6,90 €, gratis da 120 € IVA inclusa — esempio'),
        ],
        [
          L('Autre pays de l’UE', 'Other EU country', 'Anderes EU-Land', 'Otro país de la UE', 'Altro paese UE'),
          L('3 à 8 jours ouvrés selon l’origine', '3 to 8 working days depending on the source', '3 bis 8 Werktage je nach Herkunft', '3 a 8 días laborables según el origen', '3–8 giorni lavorativi secondo l’origine'),
          L('14,90 € — exemple', '€14.90 — example', '14,90 € — Beispiel', '14,90 € — ejemplo', '14,90 € — esempio'),
        ],
      ],
    },
    {
      kind: 'p',
      text: L(
        'Les frais réels seront calculés à l’étape de paiement. La TVA dépendra du pays de livraison, dans le cadre du guichet unique (OSS) une fois la société immatriculée.',
        'Real fees will be calculated at payment. VAT will depend on the delivery country, under the One-Stop Shop (OSS) once the company is registered.',
        'Die echten Kosten werden bei der Zahlung berechnet. Die MwSt. hängt vom Lieferland ab, über den One-Stop-Shop (OSS), sobald die Gesellschaft registriert ist.',
        'Los gastos reales se calcularán en el pago. El IVA dependerá del país de entrega, en el régimen de ventanilla única (OSS) cuando la sociedad esté registrada.',
        'I costi reali si calcoleranno al pagamento. L’IVA dipenderà dal paese di consegna, nel regime dello sportello unico (OSS) una volta registrata la società.',
      ),
    },
  ],
}

export const returnsDoc: InfoDoc = {
  title: L('Retours', 'Returns', 'Rückgabe', 'Devoluciones', 'Resi'),
  lede: L(
    'Les consommateurs de l’Union européenne disposent de 14 jours pour se rétracter après réception, sur les pièces éligibles.',
    'Consumers in the European Union have 14 days to withdraw after receipt, on eligible parts.',
    'Verbraucher in der Europäischen Union haben 14 Tage nach Erhalt ein Widerrufsrecht, bei geeigneten Teilen.',
    'Los consumidores de la Unión Europea disponen de 14 días para desistir tras la recepción, en las piezas admisibles.',
    'I consumatori dell’Unione europea hanno 14 giorni per recedere dopo la ricezione, sui ricambi ammessi.',
  ),
  blocks: [
    { kind: 'callout', text: review },
    {
      kind: 'h2',
      text: L('Délai', 'Period', 'Frist', 'Plazo', 'Termine'),
    },
    {
      kind: 'p',
      text: L(
        'Le délai de 14 jours court à compter de la réception de la pièce, ou de la dernière pièce si la commande arrive en plusieurs colis. Pour l’exercer, il suffira d’écrire à [EMAIL] ou d’utiliser le formulaire qui sera publié avec le paiement. Aujourd’hui, aucun message n’est transmis.',
        'The 14 days run from receipt of the part, or of the last part if the order arrives in several parcels. To use it, write to [EMAIL] or use the form that will be published with payment. Today, no message is sent.',
        'Die 14 Tage beginnen mit dem Erhalt des Teils oder des letzten Teils, wenn die Bestellung in mehreren Paketen kommt. Dafür genügt eine Nachricht an [EMAIL] oder das Formular, das mit der Zahlung erscheint. Heute wird keine Nachricht übertragen.',
        'El plazo de 14 días corre desde la recepción de la pieza, o de la última si el pedido llega en varios paquetes. Para usarlo, escriba a [EMAIL] o use el formulario que se publicará con el pago. Hoy no se transmite ningún mensaje.',
        'I 14 giorni decorrono dal ricevimento del ricambio, o dell’ultimo se l’ordine arriva in più colli. Per esercitarlo basterà scrivere a [EMAIL] o usare il modulo che sarà pubblicato con il pagamento. Oggi nessun messaggio viene trasmesso.',
      ),
    },
    {
      kind: 'h2',
      text: L('État de la pièce', 'Condition of the part', 'Zustand des Teils', 'Estado de la pieza', 'Stato del ricambio'),
    },
    {
      kind: 'ul',
      items: [
        L(
          'La pièce doit pouvoir être renvoyée dans un état qui permet sa remise en vente, avec l’emballage d’origine lorsque c’est raisonnable.',
          'The part should come back in a condition that allows it to be resold, with the original packaging when that is reasonable.',
          'Das Teil soll in einem wiederverkaufsfähigen Zustand zurückkommen, mit Originalverpackung, soweit das zumutbar ist.',
          'La pieza debe poder devolverse en un estado que permita revenderla, con el embalaje original cuando sea razonable.',
          'Il ricambio va restituito in uno stato che ne consenta la rivendita, con l’imballo originale quando è ragionevole.',
        ),
        L(
          'Les liquides descellés, les pièces montées sur le véhicule et les biens nettement personnalisés pourront être exclus. La liste exacte sera confirmée avec un conseil.',
          'Unsealed fluids, parts fitted to the vehicle and clearly personalised goods may be excluded. The exact list will be confirmed with counsel.',
          'Geöffnete Flüssigkeiten, am Fahrzeug montierte Teile und deutlich personalisierte Waren können ausgeschlossen sein. Die genaue Liste bestätigt ein juristischer Rat.',
          'Los líquidos abiertos, las piezas montadas en el vehículo y los bienes claramente personalizados podrán excluirse. La lista exacta se confirmará con un asesor.',
          'I liquidi aperti, i ricambi montati sul veicolo e i beni chiaramente personalizzati potranno essere esclusi. L’elenco esatto sarà confermato con un legale.',
        ),
      ],
    },
    {
      kind: 'h2',
      text: L('Adresse de retour', 'Return address', 'Rücksendeadresse', 'Dirección de devolución', 'Indirizzo di reso'),
    },
    {
      kind: 'p',
      text: L(
        'Les retours du stock propre iront à [ADRESSE DE RETOUR]. Pour une pièce expédiée par un partenaire, la marche à suivre sera indiquée sur la confirmation, afin d’éviter un renvoi inutile vers l’entrepôt.',
        'Returns of in-house stock will go to [RETURN ADDRESS]. For a part shipped by a partner, the steps will be on the confirmation, so it is not sent needlessly to the warehouse.',
        'Rücksendungen aus dem eigenen Lager gehen an [RÜCKSENDEADRESSE]. Bei einem Partnerversand steht der Ablauf auf der Bestätigung, damit nichts unnötig ins Lager geht.',
        'Las devoluciones del stock propio irán a [DIRECCIÓN DE DEVOLUCIÓN]. Si la pieza la envió un socio, el modo se indicará en la confirmación, para no devolverla en vano al almacén.',
        'I resi dello stock proprio andranno a [INDIRIZZO DI RESO]. Per un ricambio spedito da un partner, la procedura sarà sulla conferma, per evitare un rinvio inutile al magazzino.',
      ),
    },
    {
      kind: 'p',
      text: L(
        'Le remboursement interviendra par le même moyen que le paiement, une fois Shopify ou Stripe en place, au plus tard dans les délais légaux après réception du retour ou de la preuve d’expédition. Les garanties légales de conformité et contre les vices cachés restent dues, indépendamment de la rétractation.',
        'Refunds will use the same method as payment, once Shopify or Stripe is in place, within the legal period after the return is received or proof of shipping is shown. Statutory conformity and hidden-defect guarantees remain due, separately from withdrawal.',
        'Die Erstattung erfolgt über denselben Weg wie die Zahlung, sobald Shopify oder Stripe steht, innerhalb der gesetzlichen Frist nach Erhalt der Rücksendung oder eines Versandnachweises. Die gesetzlichen Garantien bleiben unabhängig vom Widerruf geschuldet.',
        'El reembolso usará el mismo medio que el pago, cuando Shopify o Stripe estén activos, dentro del plazo legal tras recibir la devolución o la prueba de envío. Las garantías legales siguen debiéndose, aparte del desistimiento.',
        'Il rimborso userà lo stesso mezzo del pagamento, quando Shopify o Stripe sarà attivo, entro i termini di legge dopo il ricevimento del reso o della prova di spedizione. Le garanzie legali restano dovute, a prescindere dal recesso.',
      ),
    },
  ],
}

export const termsDoc: InfoDoc = {
  title: L('Conditions générales de vente', 'Terms of sale', 'Allgemeine Verkaufsbedingungen', 'Condiciones generales de venta', 'Condizioni generali di vendita'),
  lede: L(
    'Ces conditions sont un modèle pour la future boutique. Elles ne s’appliquent pas encore : aucune vente n’est conclue sur cette vitrine.',
    'These terms are a draft for the future shop. They do not apply yet: no sale is concluded on this storefront.',
    'Diese Bedingungen sind ein Entwurf für den künftigen Shop. Sie gelten noch nicht: auf dieser Vitrine wird kein Verkauf geschlossen.',
    'Estas condiciones son un modelo para la futura tienda. Aún no se aplican: en esta vitrina no se concluye ninguna venta.',
    'Queste condizioni sono un modello per il futuro negozio. Non si applicano ancora: su questa vetrina non si conclude alcuna vendita.',
  ),
  blocks: [
    { kind: 'callout', text: review },
    {
      kind: 'h2',
      text: L('Objet', 'Scope', 'Gegenstand', 'Objeto', 'Oggetto'),
    },
    {
      kind: 'p',
      text: L(
        'Elles décriront la vente de pièces automobiles neuves par [RAISON SOCIALE], [FORME JURIDIQUE], dont le siège est [ADRESSE], aux consommateurs et, le cas échéant, aux professionnels. Le catalogue affiché aujourd’hui est une démonstration.',
        'They will describe the sale of new automotive parts by [COMPANY NAME], [LEGAL FORM], registered office [ADDRESS], to consumers and, where relevant, to professionals. The catalogue shown today is a demonstration.',
        'Sie werden den Verkauf neuer Fahrzeugteile durch [FIRMENNAME], [RECHTSFORM], Sitz [ADRESSE], an Verbraucher und gegebenenfalls Gewerbekunden beschreiben. Der heutige Katalog ist eine Demonstration.',
        'Describirán la venta de recambios nuevos por [RAZÓN SOCIAL], [FORMA JURÍDICA], domicilio [DIRECCIÓN], a consumidores y, en su caso, a profesionales. El catálogo de hoy es una demostración.',
        'Descriveranno la vendita di ricambi nuovi da parte di [RAGIONE SOCIALE], [FORMA GIURIDICA], sede [INDIRIZZO], a consumatori e, se del caso, a professionisti. Il catalogo di oggi è una dimostrazione.',
      ),
    },
    {
      kind: 'h2',
      text: L('Prix', 'Prices', 'Preise', 'Precios', 'Prezzi'),
    },
    {
      kind: 'p',
      text: L(
        'Les prix seront indiqués en euros, toutes taxes comprises. Le taux de TVA dépend du pays de livraison. Le taux de 20 % affiché ici illustre la France métropolitaine et n’est pas un engagement. Les frais de port seront annoncés avant le paiement.',
        'Prices will be shown in euros, including tax. The VAT rate depends on the delivery country. The 20% rate shown here illustrates mainland France and is not a commitment. Shipping fees will be shown before payment.',
        'Die Preise werden in Euro einschließlich Steuer angegeben. Der MwSt.-Satz hängt vom Lieferland ab. Die hier gezeigten 20 % veranschaulichen Festlandfrankreich und sind keine Zusage. Die Versandkosten stehen vor der Zahlung.',
        'Los precios se indicarán en euros, impuestos incluidos. El tipo de IVA depende del país de entrega. El 20 % mostrado ilustra la Francia metropolitana y no es un compromiso. Los portes se anunciarán antes del pago.',
        'I prezzi saranno indicati in euro, imposte incluse. L’aliquota IVA dipende dal paese di consegna. Il 20% mostrato illustra la Francia metropolitana e non è un impegno. Le spese di spedizione saranno note prima del pagamento.',
      ),
    },
    {
      kind: 'h2',
      text: L('Commande et paiement', 'Order and payment', 'Bestellung und Zahlung', 'Pedido y pago', 'Ordine e pagamento'),
    },
    {
      kind: 'p',
      text: L(
        'La commande sera conclue lorsque le prestataire de paiement — Shopify ou Stripe Checkout — aura confirmé l’encaissement. Tant que ce branchement n’est pas fait, le bouton de cette vitrine ne crée aucune commande et n’encaisse rien.',
        'An order will be formed when the payment provider — Shopify or Stripe Checkout — confirms the charge. Until that connection exists, the button on this storefront creates no order and takes no payment.',
        'Ein Vertrag entsteht, wenn der Zahlungsdienst — Shopify oder Stripe Checkout — den Einzug bestätigt. Solange diese Anbindung fehlt, erzeugt die Schaltfläche dieser Vitrine keine Bestellung und zieht nichts ein.',
        'El pedido se concluirá cuando el prestador de pago — Shopify o Stripe Checkout — confirme el cobro. Mientras esa conexión no exista, el botón de esta vitrina no crea ningún pedido ni cobra nada.',
        'L’ordine si conclude quando il prestatore di pagamento — Shopify o Stripe Checkout — conferma l’incasso. Finché quel collegamento manca, il pulsante di questa vetrina non crea alcun ordine e non incassa nulla.',
      ),
    },
    {
      kind: 'h2',
      text: L('Disponibilité', 'Availability', 'Verfügbarkeit', 'Disponibilidad', 'Disponibilità'),
    },
    {
      kind: 'p',
      text: L(
        'Une pièce « En stock » part de l’entrepôt de la société. Une pièce « Expédié par notre partenaire » est préparée hors de cet entrepôt et peut voyager dans un colis distinct. Les délais de cette vitrine sont des exemples.',
        'An “In stock” part leaves the company’s warehouse. A part “Shipped by our partner” is prepared outside that warehouse and may travel in a separate parcel. Lead times on this storefront are examples.',
        'Ein Teil „Auf Lager“ verlässt das Lager der Gesellschaft. Ein Teil „Versand durch unseren Partner“ wird außerhalb dieses Lagers bereitgestellt und kann in einem eigenen Paket reisen. Die Fristen dieser Vitrine sind Beispiele.',
        'Una pieza «En stock» sale del almacén de la sociedad. Una pieza «Enviado por nuestro socio» se prepara fuera de ese almacén y puede viajar en un paquete distinto. Los plazos de esta vitrina son ejemplos.',
        'Un ricambio «Disponibile» parte dal magazzino della società. Un ricambio «Spedito dal nostro partner» è preparato fuori da quel magazzino e può viaggiare in un collo distinto. I tempi di questa vetrina sono esempi.',
      ),
    },
    {
      kind: 'h2',
      text: L('Rétractation et garanties', 'Withdrawal and guarantees', 'Widerruf und Garantien', 'Desistimiento y garantías', 'Recesso e garanzie'),
    },
    {
      kind: 'p',
      text: L(
        'Le consommateur dispose d’un délai de rétractation de 14 jours, détaillé sur la page Retours, sous réserve des exceptions légales. Les garanties légales de conformité et contre les vices cachés s’appliquent selon le droit du pays du consommateur. Pour un vendeur établi en France, le code de la consommation devra être cité dans la version définitive.',
        'The consumer has a 14-day withdrawal period, set out on the Returns page, subject to legal exceptions. Statutory conformity and hidden-defect guarantees apply under the consumer’s local law. For a seller established in France, the consumer code must be cited in the final version.',
        'Verbraucher haben eine 14-tägige Widerrufsfrist, beschrieben auf der Seite Rückgabe, vorbehaltlich gesetzlicher Ausnahmen. Die gesetzlichen Garantien gelten nach dem Recht des Verbraucherlandes. Für einen in Frankreich ansässigen Verkäufer ist das Verbrauchergesetzbuch in der Endfassung zu nennen.',
        'El consumidor dispone de 14 días de desistimiento, descritos en la página Devoluciones, con las excepciones legales. Las garantías legales se aplican según el derecho del país del consumidor. Para un vendedor establecido en Francia, el código de consumo deberá citarse en la versión definitiva.',
        'Il consumatore ha 14 giorni di recesso, descritti nella pagina Resi, salvo le eccezioni di legge. Le garanzie legali si applicano secondo il diritto del paese del consumatore. Per un venditore stabilito in Francia, il codice del consumo andrà citato nella versione definitiva.',
      ),
    },
    {
      kind: 'h2',
      text: L('Médiation', 'Mediation', 'Schlichtung', 'Mediación', 'Mediazione'),
    },
    {
      kind: 'p',
      text: L(
        'Un médiateur de la consommation sera désigné avant l’ouverture des ventes : [MÉDIATEUR DE LA CONSOMMATION]. La plateforme européenne de règlement en ligne des litiges pourra être indiquée à ce moment-là.',
        'A consumer mediator will be appointed before sales open: [CONSUMER MEDIATOR]. The European online dispute platform can be linked at that point.',
        'Ein Verbraucherschlichter wird vor Verkaufsstart benannt: [VERBRAUCHERSCHLICHTER]. Die europäische Online-Streitbeilegungsplattform kann dann verlinkt werden.',
        'Se designará un mediador de consumo antes de abrir las ventas: [MEDIADOR DE CONSUMO]. La plataforma europea de resolución en línea podrá indicarse entonces.',
        'Un mediatore dei consumatori sarà designato prima dell’apertura delle vendite: [MEDIATORE DEI CONSUMATORI]. La piattaforma europea di risoluzione online potrà essere indicata in quel momento.',
      ),
    },
  ],
}

export const legalDoc: InfoDoc = {
  title: L('Mentions légales', 'Legal notice', 'Impressum', 'Aviso legal', 'Note legali'),
  lede: L(
    'Informations exigées pour l’éditeur du site. Les champs entre crochets sont volontairement vides.',
    'Information required of the site publisher. Fields in brackets are deliberately empty.',
    'Pflichtangaben des Seitenbetreibers. Felder in Klammern sind absichtlich leer.',
    'Información exigida al editor del sitio. Los campos entre corchetes están vacíos a propósito.',
    'Informazioni richieste all’editore del sito. I campi tra parentesi sono volutamente vuoti.',
  ),
  blocks: [
    { kind: 'callout', text: review },
    {
      kind: 'h2',
      text: L('Éditeur', 'Publisher', 'Anbieter', 'Editor', 'Editore'),
    },
    {
      kind: 'ul',
      items: [
        L('Dénomination : [RAISON SOCIALE]', 'Name: [COMPANY NAME]', 'Name: [FIRMENNAME]', 'Denominación: [RAZÓN SOCIAL]', 'Denominazione: [RAGIONE SOCIALE]'),
        L('Forme : [FORME JURIDIQUE]', 'Form: [LEGAL FORM]', 'Form: [RECHTSFORM]', 'Forma: [FORMA JURÍDICA]', 'Forma: [FORMA GIURIDICA]'),
        L('Capital : [CAPITAL SOCIAL]', 'Share capital: [SHARE CAPITAL]', 'Kapital: [STAMMKAPITAL]', 'Capital: [CAPITAL SOCIAL]', 'Capitale: [CAPITALE SOCIALE]'),
        L('Siège : [ADRESSE], [CODE POSTAL] [VILLE], [PAYS]', 'Office: [ADDRESS], [POSTCODE] [CITY], [COUNTRY]', 'Sitz: [ADRESSE], [PLZ] [ORT], [LAND]', 'Domicilio: [DIRECCIÓN], [CÓDIGO POSTAL] [CIUDAD], [PAÍS]', 'Sede: [INDIRIZZO], [CAP] [CITTÀ], [PAESE]'),
        L('RCS : [RCS]', 'Register: [COMPANY REGISTER]', 'Register: [HANDELSREGISTER]', 'Registro: [REGISTRO MERCANTIL]', 'Registro: [REGISTRO IMPRESE]'),
        L('SIREN : [SIREN]', 'SIREN: [SIREN]', 'SIREN: [SIREN]', 'SIREN: [SIREN]', 'SIREN: [SIREN]'),
        L('TVA intracommunautaire : [NUMÉRO TVA]', 'EU VAT: [VAT NUMBER]', 'USt-IdNr.: [UST-IDNR]', 'IVA intracomunitario: [NÚMERO IVA]', 'Partita IVA: [PARTITA IVA]'),
        L('E-mail : [EMAIL]', 'Email: [EMAIL]', 'E-Mail: [EMAIL]', 'Correo: [EMAIL]', 'E-mail: [EMAIL]'),
        L('Téléphone : [TÉLÉPHONE]', 'Phone: [PHONE]', 'Telefon: [TELEFON]', 'Teléfono: [TELÉFONO]', 'Telefono: [TELEFONO]'),
        L(
          'Directeur de la publication : [DIRECTEUR DE LA PUBLICATION]',
          'Publication director: [PUBLICATION DIRECTOR]',
          'Verantwortlich für den Inhalt: [INHALTSVERANTWORTLICHER]',
          'Director de la publicación: [DIRECTOR DE LA PUBLICACIÓN]',
          'Direttore della pubblicazione: [DIRETTORE DELLA PUBBLICAZIONE]',
        ),
      ],
    },
    {
      kind: 'h2',
      text: L('Hébergement', 'Hosting', 'Hosting', 'Alojamiento', 'Hosting'),
    },
    {
      kind: 'p',
      text: L(
        'L’hébergeur sera indiqué ici au moment du déploiement : [HÉBERGEUR], [ADRESSE DE L’HÉBERGEUR]. Selon le choix, il s’agira de Vercel, de Netlify, de GitHub Pages ou d’un autre prestataire.',
        'The host will be named here at deployment: [HOST], [HOST ADDRESS]. Depending on the choice, that will be Vercel, Netlify, GitHub Pages or another provider.',
        'Der Hoster wird beim Deployment genannt: [HOSTER], [ADRESSE DES HOSTERS]. Je nach Wahl Vercel, Netlify, GitHub Pages oder ein anderer Anbieter.',
        'El alojador se indicará al desplegar: [ALOJADOR], [DIRECCIÓN DEL ALOJADOR]. Según la elección, será Vercel, Netlify, GitHub Pages u otro prestador.',
        'L’host sarà indicato al momento del deploy: [HOST], [INDIRIZZO DELL’HOST]. A seconda della scelta sarà Vercel, Netlify, GitHub Pages o un altro fornitore.',
      ),
    },
    {
      kind: 'h2',
      text: L('Nom de domaine', 'Domain name', 'Domain', 'Nombre de dominio', 'Nome di dominio'),
    },
    {
      kind: 'p',
      text: L(
        'Le nom envisagé est grandlinetime.com. Il n’est pas encore enregistré. Aucun cookie publicitaire n’est déposé par cette vitrine.',
        'The planned name is grandlinetime.com. It is not registered yet. This storefront sets no advertising cookies.',
        'Der geplante Name ist grandlinetime.com. Er ist noch nicht registriert. Diese Vitrine setzt keine Werbe-Cookies.',
        'El nombre previsto es grandlinetime.com. Aún no está registrado. Esta vitrina no instala cookies publicitarias.',
        'Il nome previsto è grandlinetime.com. Non è ancora registrato. Questa vetrina non imposta cookie pubblicitari.',
      ),
    },
  ],
}

export const privacyDoc: InfoDoc = {
  title: L('Confidentialité', 'Privacy', 'Datenschutz', 'Privacidad', 'Privacy'),
  lede: L(
    'Cette page décrit le traitement prévu des données et ce que fait réellement la vitrine aujourd’hui.',
    'This page describes the intended processing and what the storefront actually does today.',
    'Diese Seite beschreibt die geplante Verarbeitung und das, was die Vitrine heute wirklich tut.',
    'Esta página describe el tratamiento previsto y lo que la vitrina hace realmente hoy.',
    'Questa pagina descrive il trattamento previsto e ciò che la vetrina fa davvero oggi.',
  ),
  blocks: [
    { kind: 'callout', text: review },
    {
      kind: 'h2',
      text: L('Responsable', 'Controller', 'Verantwortlicher', 'Responsable', 'Titolare'),
    },
    {
      kind: 'p',
      text: L(
        'Le responsable du traitement sera [RAISON SOCIALE], [ADRESSE], contact [EMAIL]. Tant que ces éléments ne sont pas publiés, aucune base client n’est constituée.',
        'The controller will be [COMPANY NAME], [ADDRESS], contact [EMAIL]. Until those details are published, no customer file is built.',
        'Verantwortlicher wird [FIRMENNAME], [ADRESSE], Kontakt [EMAIL]. Solange diese Angaben fehlen, entsteht keine Kundendatei.',
        'El responsable será [RAZÓN SOCIAL], [DIRECCIÓN], contacto [EMAIL]. Mientras esos datos no se publiquen, no se constituye ningún fichero de clientes.',
        'Il titolare sarà [RAGIONE SOCIALE], [INDIRIZZO], contatto [EMAIL]. Finché questi dati non sono pubblicati, non si costituisce alcun archivio clienti.',
      ),
    },
    {
      kind: 'h2',
      text: L('Ce que fait cette vitrine', 'What this preview does', 'Was diese Vitrine tut', 'Qué hace esta vitrina', 'Cosa fa questa vetrina'),
    },
    {
      kind: 'ul',
      items: [
        L(
          'Le panier, la langue et le choix sur le bandeau cookies sont enregistrés dans le navigateur (stockage local). Ils ne sont pas envoyés à un serveur.',
          'The cart, language and cookie-banner choice are stored in the browser (local storage). They are not sent to a server.',
          'Warenkorb, Sprache und die Wahl im Cookie-Hinweis bleiben im Browser (lokaler Speicher). Sie werden nicht an einen Server gesendet.',
          'La cesta, el idioma y la elección del aviso de cookies se guardan en el navegador (almacenamiento local). No se envían a un servidor.',
          'Carrello, lingua e scelta sul banner cookie restano nel browser (archivio locale). Non sono inviati a un server.',
        ),
        L(
          'Le formulaire de contact et la commande exemple ne transmettent aucune donnée.',
          'The contact form and the example checkout transmit nothing.',
          'Kontaktformular und Beispielkasse übertragen nichts.',
          'El formulario de contacto y el pedido de ejemplo no transmiten ningún dato.',
          'Il modulo di contatto e il checkout di esempio non trasmettono alcun dato.',
        ),
        L(
          'Aucun traceur publicitaire ni outil de mesure d’audience n’est chargé.',
          'No advertising tracker and no audience measurement tool is loaded.',
          'Es wird kein Werbe-Tracker und kein Reichweitenwerkzeug geladen.',
          'No se carga ningún rastreador publicitario ni herramienta de audiencia.',
          'Non è caricato alcun tracker pubblicitario né strumento di misurazione.',
        ),
      ],
    },
    {
      kind: 'h2',
      text: L('Lorsque la boutique ouvrira', 'When the shop opens', 'Wenn der Shop öffnet', 'Cuando la tienda abra', 'Quando il negozio aprirà'),
    },
    {
      kind: 'p',
      text: L(
        'Les commandes recueilleront l’identité, l’adresse de livraison, l’e-mail et le détail des pièces, pour exécuter le contrat et respecter les obligations comptables. Le paiement sera traité par Shopify ou Stripe, qui seront responsables de leurs propres traitements. Les transporteurs recevront le nécessaire à la livraison. Les durées de conservation et les éventuels transferts hors de l’Union européenne seront précisés avec ces prestataires.',
        'Orders will collect identity, delivery address, email and the parts ordered, to perform the contract and meet accounting duties. Payment will be handled by Shopify or Stripe, who remain responsible for their own processing. Carriers will receive what delivery requires. Retention periods and any transfers outside the European Union will be set out with those providers.',
        'Bestellungen erfassen Identität, Lieferadresse, E-Mail und die Teile, um den Vertrag zu erfüllen und die Buchhaltung zu führen. Die Zahlung läuft über Shopify oder Stripe, die für ihre eigene Verarbeitung verantwortlich bleiben. Transporteure erhalten das für die Lieferung Nötige. Speicherfristen und mögliche Übermittlungen außerhalb der EU werden mit diesen Anbietern festgelegt.',
        'Los pedidos recogerán la identidad, la dirección de entrega, el correo y el detalle de las piezas, para ejecutar el contrato y las obligaciones contables. El pago lo tratará Shopify o Stripe, responsables de sus propios tratamientos. Los transportistas recibirán lo necesario para la entrega. Los plazos de conservación y las posibles transferencias fuera de la UE se precisarán con esos prestadores.',
        'Gli ordini raccoglieranno identità, indirizzo di consegna, e-mail e dettaglio dei ricambi, per eseguire il contratto e gli obblighi contabili. Il pagamento sarà trattato da Shopify o Stripe, responsabili dei propri trattamenti. I corrieri riceveranno quanto serve alla consegna. I tempi di conservazione e gli eventuali trasferimenti fuori dall’UE saranno precisati con quei fornitori.',
      ),
    },
    {
      kind: 'h2',
      text: L('Vos droits', 'Your rights', 'Ihre Rechte', 'Sus derechos', 'I suoi diritti'),
    },
    {
      kind: 'p',
      text: L(
        'Vous pourrez demander l’accès, la rectification, l’effacement, la limitation, la portabilité et, selon le cas, vous opposer au traitement, en écrivant à [EMAIL]. Vous pourrez aussi saisir l’autorité de votre pays. En France, il s’agit de la CNIL (cnil.fr).',
        'You will be able to request access, rectification, erasure, restriction, portability and, where applicable, to object, by writing to [EMAIL]. You can also contact your local authority. In France, that is the CNIL (cnil.fr).',
        'Sie können Auskunft, Berichtigung, Löschung, Einschränkung, Übertragung und gegebenenfalls Widerspruch verlangen, per Nachricht an [EMAIL]. Sie können sich auch an die Aufsicht Ihres Landes wenden. In Frankreich ist das die CNIL (cnil.fr).',
        'Podrá pedir acceso, rectificación, supresión, limitación, portabilidad y, según el caso, oponerse, escribiendo a [EMAIL]. También puede acudir a la autoridad de su país. En Francia es la CNIL (cnil.fr).',
        'Potrà chiedere accesso, rettifica, cancellazione, limitazione, portabilità e, ove previsto, opporsi, scrivendo a [EMAIL]. Può anche rivolgersi all’autorità del suo paese. In Francia è la CNIL (cnil.fr).',
      ),
    },
    {
      kind: 'h2',
      text: L('Cookies', 'Cookies', 'Cookies', 'Cookies', 'Cookie'),
    },
    {
      kind: 'p',
      text: L(
        'Le bandeau informe sur un stockage strictement nécessaire au panier et à la langue. Aucun cookie optionnel n’est déposé dans cette version. Si une mesure d’audience est ajoutée plus tard, elle sera soumise à un choix préalable.',
        'The banner describes storage that is strictly needed for the cart and the language. No optional cookie is set in this version. If audience measurement is added later, it will require a prior choice.',
        'Der Hinweis beschreibt einen Speicher, der ausschließlich für Warenkorb und Sprache nötig ist. In dieser Version wird kein optionales Cookie gesetzt. Kommt später eine Reichweitenmessung hinzu, braucht sie eine vorherige Wahl.',
        'El aviso informa de un almacenamiento estrictamente necesario para la cesta y el idioma. En esta versión no se instala ninguna cookie opcional. Si más adelante se añade una medición de audiencia, exigirá una elección previa.',
        'Il banner informa di un archivio strettamente necessario al carrello e alla lingua. In questa versione non è impostato alcun cookie facoltativo. Se in seguito si aggiunge una misurazione, richiederà una scelta preventiva.',
      ),
    },
  ],
}

export const docs = {
  about: aboutDoc,
  delivery: deliveryDoc,
  returns: returnsDoc,
  terms: termsDoc,
  legal: legalDoc,
  privacy: privacyDoc,
} as const

export type DocId = keyof typeof docs
