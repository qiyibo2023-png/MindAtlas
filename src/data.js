const cats=[[...I18n.pair("platform.m_56dce48196a6")],[...I18n.pair("platform.m_19c5d27991bd")],[...I18n.pair("platform.m_0d4cdf6d49bf")],[...I18n.pair("platform.m_cd1e18f50070")],[...I18n.pair("platform.m_819323c5abfa")],[...I18n.pair("platform.m_f37f73e6f7df")],[...I18n.pair("platform.m_5ccf30f94565")],[...I18n.pair("platform.m_6a40474b3753")],[...I18n.pair("platform.m_7b5d3890a1f6")],[...I18n.pair("platform.m_455872832335")]];
const sources=[
[...I18n.pair("platform.m_61ba6cc17ddf"),'https://www.who.int/news-room/fact-sheets/detail/mental-disorders','2025-09-30'],
[...I18n.pair("platform.m_699d727fdeae"),'https://www.nice.org.uk/guidance/ng222',I18n.pair("references.review2026")],
[...I18n.pair("platform.m_7e63e61594cf"),'https://www.nice.org.uk/guidance/cg113/chapter/recommendations','2011 / 2020'],
[...I18n.pair("platform.m_00416450a72f"),'https://www.nice.org.uk/guidance/cg185/chapter/recommendations',I18n.pair("references.guideline")],
[...I18n.pair("platform.m_c58725b30322"),'https://www.nice.org.uk/guidance/ng116/chapter/recommendations','2018'],
[...I18n.pair("platform.m_bca3d3c5f393"),'https://www.nice.org.uk/guidance/ng69',I18n.pair("references.review2024Aug")],
[...I18n.pair("platform.m_fca229a2f4fc"),'https://www.nimh.nih.gov/health/topics/psychotherapies',I18n.pair("references.review2024Feb")],
[...I18n.pair("platform.m_ef5784fd1094"),'https://www.nimh.nih.gov/health/topics',I18n.pair('common.livingIndex')],
[...I18n.pair("platform.m_b3e432b1c60e"),'https://www.nimh.nih.gov/health/topics/caring-for-your-mental-health',I18n.pair('common.livingResource')],
[...I18n.pair("platform.m_a27b97806c6e"),'https://www.nice.org.uk/guidance/conditions-and-diseases/mental-health-behavioural-and-neurodevelopmental-conditions/',I18n.pair('common.livingIndex')]];
// Bilingual editorial summaries, not diagnostic criteria or validated scales.
const topics=[
[1,...I18n.pair("platform.m_5225c9865424"),...I18n.pair("platform.m_ef00f79e2484"),...I18n.pair("platform.m_c4f26fdbb859"),...I18n.pair("platform.m_211ea828d376"),...I18n.pair("platform.m_c4cd4519cfc2"),1],
[1,...I18n.pair("platform.m_81685a246191"),...I18n.pair("platform.m_4793744c5f36"),...I18n.pair("platform.m_5e8855289ff9"),...I18n.pair("platform.m_2911eb4f1f87"),...I18n.pair("platform.m_9819488cf713"),3],
[2,...I18n.pair("platform.m_e21b7383cdca"),...I18n.pair("platform.m_b94891efd6e4"),...I18n.pair("platform.m_b6ff4e78cdc8"),...I18n.pair("platform.m_115e146d27f1"),...I18n.pair("platform.m_173f8fb7833c"),2],
[2,...I18n.pair("platform.m_86eac9fc8505"),...I18n.pair("platform.m_375fa300e32b"),...I18n.pair("platform.m_8b4090aa8a5a"),...I18n.pair("platform.m_57066d6df8c7"),...I18n.pair("platform.m_11ee16f03a00"),2],
[2,...I18n.pair("platform.m_bf28edd8b266"),...I18n.pair("platform.m_29d760564fee"),...I18n.pair("platform.m_09c4e0aef986"),...I18n.pair("platform.m_8fcc1d6dca0e"),...I18n.pair("platform.m_f32bbda2653f"),6],
[3,...I18n.pair("platform.m_8b0eb8e13e98"),...I18n.pair("platform.m_b8fe2cceb805"),...I18n.pair("platform.m_8756a77fb785"),...I18n.pair("platform.m_daca827a610a"),...I18n.pair("platform.m_7c8e896c0b93"),9],
[3,...I18n.pair("platform.m_74cce6dec778"),...I18n.pair("platform.m_b78b6f949d52"),...I18n.pair("platform.m_894bcd94025b"),...I18n.pair("platform.m_1df36c4e0b2b"),...I18n.pair("platform.m_2b50e79bc15b"),9],
[4,...I18n.pair("platform.m_f6a6d5a22aef"),...I18n.pair("platform.m_a254851f66df"),...I18n.pair("platform.m_40d678033d63"),...I18n.pair("platform.m_b06ba575e9fb"),...I18n.pair("platform.m_7094f8191b15"),4],
[4,...I18n.pair("platform.m_33421a6d1acc"),...I18n.pair("platform.m_dc398ec72ef9"),...I18n.pair("platform.m_fd89ff18ce83"),...I18n.pair("platform.m_88113909d50b"),...I18n.pair("platform.m_03a7871fc987"),6],
[5,...I18n.pair("platform.m_0a03b5e5fcff"),...I18n.pair("platform.m_e35c5c0b965b"),...I18n.pair("platform.m_c1eaae0040e4"),...I18n.pair("platform.m_5031ff6eb6a4"),...I18n.pair("platform.m_c3c1d8ab63a8"),0],
[6,...I18n.pair("platform.m_ab03d880bd6d"),...I18n.pair("platform.m_2c29f79cc7ef"),...I18n.pair("platform.m_97c6b44baea2"),...I18n.pair("platform.m_5387b02245e7"), ...I18n.pair("platform.m_70576abff89a"),0],
[6,...I18n.pair("platform.m_5813b810efd4"),...I18n.pair("platform.m_641d33c6ed3b"),...I18n.pair("platform.m_744823896f81"),...I18n.pair("platform.m_07fcb193187f"),...I18n.pair("platform.m_3d66b74c36a0"),0],
[7,...I18n.pair("platform.m_d1875dccd9fa"),...I18n.pair("platform.m_1e4df48146f0"),...I18n.pair("platform.m_5f62356a86c5"),...I18n.pair("platform.m_3c05b485105d"),...I18n.pair("platform.m_577b2a4ac20f"),5],
[7,...I18n.pair("platform.m_cbaee6ed6b5e"),...I18n.pair("platform.m_4199b294f6e3"),...I18n.pair("platform.m_67f32687e209"),...I18n.pair("platform.m_9637d1c32232"),...I18n.pair("platform.m_985b2030ad52"),6],
[8,...I18n.pair("platform.m_e59c924e7d42"),...I18n.pair("platform.m_c0492f379e3d"),...I18n.pair("platform.m_4b965ecaa4ad"),...I18n.pair("platform.m_36bbbd8146b4"),...I18n.pair("platform.m_3e2c4952947b"),9],
[8,...I18n.pair("platform.m_e534a0ad0817"),...I18n.pair("platform.m_d22cb1a1bf54"),...I18n.pair("platform.m_f990e3b76b8a"),...I18n.pair("platform.m_6c580517ff47"),...I18n.pair("platform.m_2c49135b829c"),9],
[9,...I18n.pair("platform.m_e05783a5fe86"),...I18n.pair("platform.m_f471e5c687d9"),...I18n.pair("platform.m_f3aab863fee4"),...I18n.pair("platform.m_bf8d8588e13b"),...I18n.pair("platform.m_82a1eed34018"),9],
[9,...I18n.pair("platform.m_3849f19b5489"),...I18n.pair("platform.m_5ad72a101bd2"),...I18n.pair("platform.m_27252efb1eb1"),...I18n.pair("platform.m_bfd4f6119289"),...I18n.pair("platform.m_3e48e7fd1146"),9]
];
