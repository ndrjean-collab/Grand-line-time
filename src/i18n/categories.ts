import type { CopyKey } from './copy'

export const categoryCopy: Record<string, { title: CopyKey; blurb: CopyKey }> = {
  freinage: { title: 'catFreinage', blurb: 'catFreinageB' },
  filtration: { title: 'catFiltration', blurb: 'catFiltrationB' },
  moteur: { title: 'catMoteur', blurb: 'catMoteurB' },
  suspension: { title: 'catSuspension', blurb: 'catSuspensionB' },
  eclairage: { title: 'catEclairage', blurb: 'catEclairageB' },
  carrosserie: { title: 'catCarrosserie', blurb: 'catCarrosserieB' },
  electricite: { title: 'catElectricite', blurb: 'catElectriciteB' },
  embrayage: { title: 'catEmbrayage', blurb: 'catEmbrayageB' },
  echappement: { title: 'catEchappement', blurb: 'catEchappementB' },
  refroidissement: { title: 'catRefroidissement', blurb: 'catRefroidissementB' },
  huiles: { title: 'catHuiles', blurb: 'catHuilesB' },
  accessoires: { title: 'catAccessoires', blurb: 'catAccessoiresB' },
}
