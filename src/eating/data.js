(function(A){'use strict';
A.version='eating-disorders-assessment-v1.0.0';
A.copy={
  "title": "eatingUI.title",
  "intro": "eatingUI.intro",
  "custom": "eatingUI.custom",
  "privacy": "eatingUI.privacy",
  "scope": "eatingUI.scope",
  "consent": "eatingUI.consent",
  "error": "eatingUI.error",
  "next": "eatingUI.next",
  "back": "eatingUI.back",
  "result": "eatingUI.result",
  "pause": "eatingUI.pause",
  "clear": "eatingUI.clear",
  "why": "eatingUI.why",
  "support": "eatingUI.support",
  "opposing": "eatingUI.opposing",
  "missing": "eatingUI.missing",
  "alternatives": "eatingUI.alternatives",
  "conflicts": "eatingUI.conflicts",
  "summary": "eatingUI.summary",
  "none": "eatingUI.none",
  "high": "eatingUI.high",
  "moderate": "eatingUI.moderate",
  "low": "eatingUI.low",
  "insufficient": "eatingUI.insufficient",
  "restrictive": "eatingUI.restrictive",
  "bulimia": "eatingUI.bulimia",
  "bed": "eatingUI.bed",
  "arfid": "eatingUI.arfid",
  "care": "eatingUI.care",
  "medicalWarning": "eatingUI.medicalWarning",
  "safety": "eatingUI.safety",
  "sources": "eatingUI.sources",
  "review": "eatingUI.review",
  "patternReason": "eatingUI.patternReason",
  "partialReason": "eatingUI.partialReason",
  "mixedReason": "eatingUI.mixedReason",
  "moodCompare": "eatingUI.moodCompare",
  "anxietyCompare": "eatingUI.anxietyCompare",
  "ocdCompare": "eatingUI.ocdCompare",
  "traumaCompare": "eatingUI.traumaCompare",
  "adhdCompare": "eatingUI.adhdCompare",
  "bddCompare": "eatingUI.bddCompare",
  "medicalCompare": "eatingUI.medicalCompare",
  "substanceCompare": "eatingUI.substanceCompare",
  "routerReason": "eatingUI.routerReason",
  "outsideContext": "eatingUI.outsideContext",
  "persistent": "eatingUI.persistent",
  "noComp": "eatingUI.noComp",
  "nutrition": "eatingUI.nutrition",
  "bingeFact": "eatingUI.bingeFact",
  "weightMotive": "eatingUI.weightMotive",
  "notWeight": "eatingUI.notWeight",
  "bingeCourse": "eatingUI.bingeCourse",
  "compCourse": "eatingUI.compCourse",
  "impact": "eatingUI.impact"
};
A.sections=[
  {
    "id": "intro",
    "label": "eatingUI.section_intro",
    "questions": [
      {
        "id": "intro.agree",
        "label": "eatingUI.q_intro_agree",
        "options": [
          [
            "yes",
            "eatingUI.opt_yn_yes"
          ],
          [
            "no",
            "eatingUI.opt_yn_no"
          ],
          [
            "unknown",
            "eatingUI.opt_yn_unknown"
          ]
        ]
      },
      {
        "id": "intro.adult",
        "label": "eatingUI.q_intro_adult",
        "options": [
          [
            "yes",
            "eatingUI.opt_yn_yes"
          ],
          [
            "no",
            "eatingUI.opt_yn_no"
          ],
          [
            "unknown",
            "eatingUI.opt_yn_unknown"
          ]
        ]
      },
      {
        "id": "intro.concern",
        "label": "eatingUI.q_intro_concern",
        "options": [
          [
            "restrict",
            "eatingUI.opt_concern_restrict"
          ],
          [
            "binge",
            "eatingUI.opt_concern_binge"
          ],
          [
            "comp",
            "eatingUI.opt_concern_comp"
          ],
          [
            "other",
            "eatingUI.opt_concern_other"
          ]
        ]
      }
    ]
  },
  {
    "id": "medicalCheck",
    "label": "eatingUI.section_medicalCheck",
    "questions": [
      {
        "id": "medicalNow.fainting",
        "label": "eatingUI.q_medicalNow_fainting",
        "options": [
          [
            "yes",
            "eatingUI.opt_yn_yes"
          ],
          [
            "no",
            "eatingUI.opt_yn_no"
          ],
          [
            "unknown",
            "eatingUI.opt_yn_unknown"
          ]
        ]
      },
      {
        "id": "medicalNow.weakness",
        "label": "eatingUI.q_medicalNow_weakness",
        "options": [
          [
            "yes",
            "eatingUI.opt_yn_yes"
          ],
          [
            "no",
            "eatingUI.opt_yn_no"
          ],
          [
            "unknown",
            "eatingUI.opt_yn_unknown"
          ]
        ]
      },
      {
        "id": "medicalNow.dehydration",
        "label": "eatingUI.q_medicalNow_dehydration",
        "options": [
          [
            "yes",
            "eatingUI.opt_yn_yes"
          ],
          [
            "no",
            "eatingUI.opt_yn_no"
          ],
          [
            "unknown",
            "eatingUI.opt_yn_unknown"
          ]
        ]
      },
      {
        "id": "medicalNow.chest",
        "label": "eatingUI.q_medicalNow_chest",
        "options": [
          [
            "yes",
            "eatingUI.opt_yn_yes"
          ],
          [
            "no",
            "eatingUI.opt_yn_no"
          ],
          [
            "unknown",
            "eatingUI.opt_yn_unknown"
          ]
        ]
      },
      {
        "id": "medicalNow.breathing",
        "label": "eatingUI.q_medicalNow_breathing",
        "options": [
          [
            "yes",
            "eatingUI.opt_yn_yes"
          ],
          [
            "no",
            "eatingUI.opt_yn_no"
          ],
          [
            "unknown",
            "eatingUI.opt_yn_unknown"
          ]
        ]
      },
      {
        "id": "medicalNow.confusion",
        "label": "eatingUI.q_medicalNow_confusion",
        "options": [
          [
            "yes",
            "eatingUI.opt_yn_yes"
          ],
          [
            "no",
            "eatingUI.opt_yn_no"
          ],
          [
            "unknown",
            "eatingUI.opt_yn_unknown"
          ]
        ]
      },
      {
        "id": "medicalNow.bleeding",
        "label": "eatingUI.q_medicalNow_bleeding",
        "options": [
          [
            "yes",
            "eatingUI.opt_yn_yes"
          ],
          [
            "no",
            "eatingUI.opt_yn_no"
          ],
          [
            "unknown",
            "eatingUI.opt_yn_unknown"
          ]
        ]
      },
      {
        "id": "medicalNow.unableEat",
        "label": "eatingUI.q_medicalNow_unableEat",
        "options": [
          [
            "yes",
            "eatingUI.opt_yn_yes"
          ],
          [
            "no",
            "eatingUI.opt_yn_no"
          ],
          [
            "unknown",
            "eatingUI.opt_yn_unknown"
          ]
        ]
      },
      {
        "id": "medicalNow.unableDrink",
        "label": "eatingUI.q_medicalNow_unableDrink",
        "options": [
          [
            "yes",
            "eatingUI.opt_yn_yes"
          ],
          [
            "no",
            "eatingUI.opt_yn_no"
          ],
          [
            "unknown",
            "eatingUI.opt_yn_unknown"
          ]
        ]
      }
    ]
  },
  {
    "id": "overview",
    "label": "eatingUI.section_overview",
    "questions": [
      {
        "id": "overview.restrict",
        "label": "eatingUI.q_overview_restrict",
        "options": [
          [
            "yes",
            "eatingUI.opt_yn_yes"
          ],
          [
            "no",
            "eatingUI.opt_yn_no"
          ],
          [
            "unknown",
            "eatingUI.opt_yn_unknown"
          ]
        ]
      },
      {
        "id": "overview.loss",
        "label": "eatingUI.q_overview_loss",
        "options": [
          [
            "yes",
            "eatingUI.opt_yn_yes"
          ],
          [
            "no",
            "eatingUI.opt_yn_no"
          ],
          [
            "unknown",
            "eatingUI.opt_yn_unknown"
          ]
        ]
      },
      {
        "id": "overview.comp",
        "label": "eatingUI.q_overview_comp",
        "options": [
          [
            "yes",
            "eatingUI.opt_yn_yes"
          ],
          [
            "no",
            "eatingUI.opt_yn_no"
          ],
          [
            "unknown",
            "eatingUI.opt_yn_unknown"
          ]
        ]
      },
      {
        "id": "overview.avoid",
        "label": "eatingUI.q_overview_avoid",
        "options": [
          [
            "yes",
            "eatingUI.opt_yn_yes"
          ],
          [
            "no",
            "eatingUI.opt_yn_no"
          ],
          [
            "unknown",
            "eatingUI.opt_yn_unknown"
          ]
        ]
      },
      {
        "id": "overview.irregular",
        "label": "eatingUI.q_overview_irregular",
        "options": [
          [
            "yes",
            "eatingUI.opt_yn_yes"
          ],
          [
            "no",
            "eatingUI.opt_yn_no"
          ],
          [
            "unknown",
            "eatingUI.opt_yn_unknown"
          ]
        ]
      }
    ]
  },
  {
    "id": "restriction",
    "label": "eatingUI.section_restriction",
    "questions": [
      {
        "id": "restriction.persistent",
        "label": "eatingUI.q_restriction_persistent",
        "options": [
          [
            "yes",
            "eatingUI.opt_yn_yes"
          ],
          [
            "no",
            "eatingUI.opt_yn_no"
          ],
          [
            "unknown",
            "eatingUI.opt_yn_unknown"
          ]
        ]
      },
      {
        "id": "restriction.intentional",
        "label": "eatingUI.q_restriction_intentional",
        "options": [
          [
            "yes",
            "eatingUI.opt_yn_yes"
          ],
          [
            "no",
            "eatingUI.opt_yn_no"
          ],
          [
            "unknown",
            "eatingUI.opt_yn_unknown"
          ]
        ]
      },
      {
        "id": "restriction.inadequate",
        "label": "eatingUI.q_restriction_inadequate",
        "options": [
          [
            "yes",
            "eatingUI.opt_yn_yes"
          ],
          [
            "no",
            "eatingUI.opt_yn_no"
          ],
          [
            "unknown",
            "eatingUI.opt_yn_unknown"
          ]
        ]
      },
      {
        "id": "restriction.rules",
        "label": "eatingUI.q_restriction_rules",
        "options": [
          [
            "yes",
            "eatingUI.opt_yn_yes"
          ],
          [
            "no",
            "eatingUI.opt_yn_no"
          ],
          [
            "unknown",
            "eatingUI.opt_yn_unknown"
          ]
        ]
      },
      {
        "id": "restriction.prevent",
        "label": "eatingUI.q_restriction_prevent",
        "options": [
          [
            "yes",
            "eatingUI.opt_yn_yes"
          ],
          [
            "no",
            "eatingUI.opt_yn_no"
          ],
          [
            "unknown",
            "eatingUI.opt_yn_unknown"
          ]
        ]
      }
    ]
  },
  {
    "id": "shape",
    "label": "eatingUI.section_shape",
    "questions": [
      {
        "id": "shape.fear",
        "label": "eatingUI.q_shape_fear",
        "options": [
          [
            "yes",
            "eatingUI.opt_yn_yes"
          ],
          [
            "no",
            "eatingUI.opt_yn_no"
          ],
          [
            "unknown",
            "eatingUI.opt_yn_unknown"
          ]
        ]
      },
      {
        "id": "shape.preoccupation",
        "label": "eatingUI.q_shape_preoccupation",
        "options": [
          [
            "yes",
            "eatingUI.opt_yn_yes"
          ],
          [
            "no",
            "eatingUI.opt_yn_no"
          ],
          [
            "unknown",
            "eatingUI.opt_yn_unknown"
          ]
        ]
      },
      {
        "id": "shape.overvalue",
        "label": "eatingUI.q_shape_overvalue",
        "options": [
          [
            "yes",
            "eatingUI.opt_yn_yes"
          ],
          [
            "no",
            "eatingUI.opt_yn_no"
          ],
          [
            "unknown",
            "eatingUI.opt_yn_unknown"
          ]
        ]
      },
      {
        "id": "shape.distortion",
        "label": "eatingUI.q_shape_distortion",
        "options": [
          [
            "yes",
            "eatingUI.opt_yn_yes"
          ],
          [
            "no",
            "eatingUI.opt_yn_no"
          ],
          [
            "unknown",
            "eatingUI.opt_yn_unknown"
          ]
        ]
      },
      {
        "id": "shape.checking",
        "label": "eatingUI.q_shape_checking",
        "options": [
          [
            "yes",
            "eatingUI.opt_yn_yes"
          ],
          [
            "no",
            "eatingUI.opt_yn_no"
          ],
          [
            "unknown",
            "eatingUI.opt_yn_unknown"
          ]
        ]
      },
      {
        "id": "shape.avoidance",
        "label": "eatingUI.q_shape_avoidance",
        "options": [
          [
            "yes",
            "eatingUI.opt_yn_yes"
          ],
          [
            "no",
            "eatingUI.opt_yn_no"
          ],
          [
            "unknown",
            "eatingUI.opt_yn_unknown"
          ]
        ]
      },
      {
        "id": "shape.distress",
        "label": "eatingUI.q_shape_distress",
        "options": [
          [
            "yes",
            "eatingUI.opt_yn_yes"
          ],
          [
            "no",
            "eatingUI.opt_yn_no"
          ],
          [
            "unknown",
            "eatingUI.opt_yn_unknown"
          ]
        ]
      },
      {
        "id": "shape.motive",
        "label": "eatingUI.q_shape_motive",
        "options": [
          [
            "yes",
            "eatingUI.opt_yn_yes"
          ],
          [
            "no",
            "eatingUI.opt_yn_no"
          ],
          [
            "unknown",
            "eatingUI.opt_yn_unknown"
          ]
        ]
      },
      {
        "id": "shape.otherDefect",
        "label": "eatingUI.q_shape_otherDefect",
        "options": [
          [
            "yes",
            "eatingUI.opt_yn_yes"
          ],
          [
            "no",
            "eatingUI.opt_yn_no"
          ],
          [
            "unknown",
            "eatingUI.opt_yn_unknown"
          ]
        ]
      }
    ]
  },
  {
    "id": "binge",
    "label": "eatingUI.section_binge",
    "questions": [
      {
        "id": "binge.amount",
        "label": "eatingUI.q_binge_amount",
        "options": [
          [
            "large",
            "eatingUI.opt_amount_large"
          ],
          [
            "subjective",
            "eatingUI.opt_amount_subjective"
          ],
          [
            "ordinary",
            "eatingUI.opt_amount_ordinary"
          ],
          [
            "unknown",
            "eatingUI.opt_amount_unknown"
          ]
        ]
      },
      {
        "id": "binge.loss",
        "label": "eatingUI.q_binge_loss",
        "options": [
          [
            "yes",
            "eatingUI.opt_yn_yes"
          ],
          [
            "no",
            "eatingUI.opt_yn_no"
          ],
          [
            "unknown",
            "eatingUI.opt_yn_unknown"
          ]
        ]
      },
      {
        "id": "binge.rapid",
        "label": "eatingUI.q_binge_rapid",
        "options": [
          [
            "yes",
            "eatingUI.opt_yn_yes"
          ],
          [
            "no",
            "eatingUI.opt_yn_no"
          ],
          [
            "unknown",
            "eatingUI.opt_yn_unknown"
          ]
        ]
      },
      {
        "id": "binge.full",
        "label": "eatingUI.q_binge_full",
        "options": [
          [
            "yes",
            "eatingUI.opt_yn_yes"
          ],
          [
            "no",
            "eatingUI.opt_yn_no"
          ],
          [
            "unknown",
            "eatingUI.opt_yn_unknown"
          ]
        ]
      },
      {
        "id": "binge.notHungry",
        "label": "eatingUI.q_binge_notHungry",
        "options": [
          [
            "yes",
            "eatingUI.opt_yn_yes"
          ],
          [
            "no",
            "eatingUI.opt_yn_no"
          ],
          [
            "unknown",
            "eatingUI.opt_yn_unknown"
          ]
        ]
      },
      {
        "id": "binge.alone",
        "label": "eatingUI.q_binge_alone",
        "options": [
          [
            "yes",
            "eatingUI.opt_yn_yes"
          ],
          [
            "no",
            "eatingUI.opt_yn_no"
          ],
          [
            "unknown",
            "eatingUI.opt_yn_unknown"
          ]
        ]
      },
      {
        "id": "binge.distress",
        "label": "eatingUI.q_binge_distress",
        "options": [
          [
            "yes",
            "eatingUI.opt_yn_yes"
          ],
          [
            "no",
            "eatingUI.opt_yn_no"
          ],
          [
            "unknown",
            "eatingUI.opt_yn_unknown"
          ]
        ]
      }
    ]
  },
  {
    "id": "compensation",
    "label": "eatingUI.section_compensation",
    "questions": [
      {
        "id": "compensation.vomiting",
        "label": "eatingUI.q_compensation_vomiting",
        "options": [
          [
            "yes",
            "eatingUI.opt_yn_yes"
          ],
          [
            "no",
            "eatingUI.opt_yn_no"
          ],
          [
            "unknown",
            "eatingUI.opt_yn_unknown"
          ]
        ]
      },
      {
        "id": "compensation.laxatives",
        "label": "eatingUI.q_compensation_laxatives",
        "options": [
          [
            "yes",
            "eatingUI.opt_yn_yes"
          ],
          [
            "no",
            "eatingUI.opt_yn_no"
          ],
          [
            "unknown",
            "eatingUI.opt_yn_unknown"
          ]
        ]
      },
      {
        "id": "compensation.diuretics",
        "label": "eatingUI.q_compensation_diuretics",
        "options": [
          [
            "yes",
            "eatingUI.opt_yn_yes"
          ],
          [
            "no",
            "eatingUI.opt_yn_no"
          ],
          [
            "unknown",
            "eatingUI.opt_yn_unknown"
          ]
        ]
      },
      {
        "id": "compensation.medication",
        "label": "eatingUI.q_compensation_medication",
        "options": [
          [
            "yes",
            "eatingUI.opt_yn_yes"
          ],
          [
            "no",
            "eatingUI.opt_yn_no"
          ],
          [
            "unknown",
            "eatingUI.opt_yn_unknown"
          ]
        ]
      },
      {
        "id": "compensation.fasting",
        "label": "eatingUI.q_compensation_fasting",
        "options": [
          [
            "yes",
            "eatingUI.opt_yn_yes"
          ],
          [
            "no",
            "eatingUI.opt_yn_no"
          ],
          [
            "unknown",
            "eatingUI.opt_yn_unknown"
          ]
        ]
      },
      {
        "id": "compensation.exercise",
        "label": "eatingUI.q_compensation_exercise",
        "options": [
          [
            "yes",
            "eatingUI.opt_yn_yes"
          ],
          [
            "no",
            "eatingUI.opt_yn_no"
          ],
          [
            "unknown",
            "eatingUI.opt_yn_unknown"
          ]
        ]
      },
      {
        "id": "compensation.other",
        "label": "eatingUI.q_compensation_other",
        "options": [
          [
            "yes",
            "eatingUI.opt_yn_yes"
          ],
          [
            "no",
            "eatingUI.opt_yn_no"
          ],
          [
            "unknown",
            "eatingUI.opt_yn_unknown"
          ]
        ]
      }
    ]
  },
  {
    "id": "exercise",
    "label": "eatingUI.section_exercise",
    "questions": [
      {
        "id": "exercise.guilt",
        "label": "eatingUI.q_exercise_guilt",
        "options": [
          [
            "yes",
            "eatingUI.opt_yn_yes"
          ],
          [
            "no",
            "eatingUI.opt_yn_no"
          ],
          [
            "unknown",
            "eatingUI.opt_yn_unknown"
          ]
        ]
      },
      {
        "id": "exercise.rigid",
        "label": "eatingUI.q_exercise_rigid",
        "options": [
          [
            "yes",
            "eatingUI.opt_yn_yes"
          ],
          [
            "no",
            "eatingUI.opt_yn_no"
          ],
          [
            "unknown",
            "eatingUI.opt_yn_unknown"
          ]
        ]
      },
      {
        "id": "exercise.injury",
        "label": "eatingUI.q_exercise_injury",
        "options": [
          [
            "yes",
            "eatingUI.opt_yn_yes"
          ],
          [
            "no",
            "eatingUI.opt_yn_no"
          ],
          [
            "unknown",
            "eatingUI.opt_yn_unknown"
          ]
        ]
      },
      {
        "id": "exercise.impact",
        "label": "eatingUI.q_exercise_impact",
        "options": [
          [
            "yes",
            "eatingUI.opt_yn_yes"
          ],
          [
            "no",
            "eatingUI.opt_yn_no"
          ],
          [
            "unknown",
            "eatingUI.opt_yn_unknown"
          ]
        ]
      }
    ]
  },
  {
    "id": "arfid",
    "label": "eatingUI.section_arfid",
    "questions": [
      {
        "id": "arfid.sensory",
        "label": "eatingUI.q_arfid_sensory",
        "options": [
          [
            "yes",
            "eatingUI.opt_yn_yes"
          ],
          [
            "no",
            "eatingUI.opt_yn_no"
          ],
          [
            "unknown",
            "eatingUI.opt_yn_unknown"
          ]
        ]
      },
      {
        "id": "arfid.interest",
        "label": "eatingUI.q_arfid_interest",
        "options": [
          [
            "yes",
            "eatingUI.opt_yn_yes"
          ],
          [
            "no",
            "eatingUI.opt_yn_no"
          ],
          [
            "unknown",
            "eatingUI.opt_yn_unknown"
          ]
        ]
      },
      {
        "id": "arfid.choking",
        "label": "eatingUI.q_arfid_choking",
        "options": [
          [
            "yes",
            "eatingUI.opt_yn_yes"
          ],
          [
            "no",
            "eatingUI.opt_yn_no"
          ],
          [
            "unknown",
            "eatingUI.opt_yn_unknown"
          ]
        ]
      },
      {
        "id": "arfid.vomiting",
        "label": "eatingUI.q_arfid_vomiting",
        "options": [
          [
            "yes",
            "eatingUI.opt_yn_yes"
          ],
          [
            "no",
            "eatingUI.opt_yn_no"
          ],
          [
            "unknown",
            "eatingUI.opt_yn_unknown"
          ]
        ]
      },
      {
        "id": "arfid.adverse",
        "label": "eatingUI.q_arfid_adverse",
        "options": [
          [
            "yes",
            "eatingUI.opt_yn_yes"
          ],
          [
            "no",
            "eatingUI.opt_yn_no"
          ],
          [
            "unknown",
            "eatingUI.opt_yn_unknown"
          ]
        ]
      },
      {
        "id": "arfid.nutrition",
        "label": "eatingUI.q_arfid_nutrition",
        "options": [
          [
            "yes",
            "eatingUI.opt_yn_yes"
          ],
          [
            "no",
            "eatingUI.opt_yn_no"
          ],
          [
            "unknown",
            "eatingUI.opt_yn_unknown"
          ]
        ]
      },
      {
        "id": "arfid.supplements",
        "label": "eatingUI.q_arfid_supplements",
        "options": [
          [
            "yes",
            "eatingUI.opt_yn_yes"
          ],
          [
            "no",
            "eatingUI.opt_yn_no"
          ],
          [
            "unknown",
            "eatingUI.opt_yn_unknown"
          ]
        ]
      },
      {
        "id": "arfid.social",
        "label": "eatingUI.q_arfid_social",
        "options": [
          [
            "yes",
            "eatingUI.opt_yn_yes"
          ],
          [
            "no",
            "eatingUI.opt_yn_no"
          ],
          [
            "unknown",
            "eatingUI.opt_yn_unknown"
          ]
        ]
      }
    ]
  },
  {
    "id": "course",
    "label": "eatingUI.section_course",
    "questions": [
      {
        "id": "course.restriction",
        "label": "eatingUI.q_course_restriction",
        "options": [
          [
            "none",
            "eatingUI.opt_freq_none"
          ],
          [
            "once",
            "eatingUI.opt_freq_once"
          ],
          [
            "repeated",
            "eatingUI.opt_freq_repeated"
          ],
          [
            "weekly",
            "eatingUI.opt_freq_weekly"
          ],
          [
            "unknown",
            "eatingUI.opt_freq_unknown"
          ]
        ]
      },
      {
        "id": "course.binge",
        "label": "eatingUI.q_course_binge",
        "options": [
          [
            "none",
            "eatingUI.opt_freq_none"
          ],
          [
            "once",
            "eatingUI.opt_freq_once"
          ],
          [
            "repeated",
            "eatingUI.opt_freq_repeated"
          ],
          [
            "weekly",
            "eatingUI.opt_freq_weekly"
          ],
          [
            "unknown",
            "eatingUI.opt_freq_unknown"
          ]
        ]
      },
      {
        "id": "course.comp",
        "label": "eatingUI.q_course_comp",
        "options": [
          [
            "none",
            "eatingUI.opt_freq_none"
          ],
          [
            "once",
            "eatingUI.opt_freq_once"
          ],
          [
            "repeated",
            "eatingUI.opt_freq_repeated"
          ],
          [
            "weekly",
            "eatingUI.opt_freq_weekly"
          ],
          [
            "unknown",
            "eatingUI.opt_freq_unknown"
          ]
        ]
      },
      {
        "id": "course.duration",
        "label": "eatingUI.q_course_duration",
        "options": [
          [
            "recent",
            "eatingUI.opt_duration_recent"
          ],
          [
            "months",
            "eatingUI.opt_duration_months"
          ],
          [
            "long",
            "eatingUI.opt_duration_long"
          ],
          [
            "unknown",
            "eatingUI.opt_duration_unknown"
          ]
        ]
      },
      {
        "id": "course.pattern",
        "label": "eatingUI.q_course_pattern",
        "options": [
          [
            "persistent",
            "eatingUI.opt_course_persistent"
          ],
          [
            "episodic",
            "eatingUI.opt_course_episodic"
          ],
          [
            "temporary",
            "eatingUI.opt_course_temporary"
          ],
          [
            "unknown",
            "eatingUI.opt_course_unknown"
          ]
        ]
      },
      {
        "id": "course.worsening",
        "label": "eatingUI.q_course_worsening",
        "options": [
          [
            "yes",
            "eatingUI.opt_yn_yes"
          ],
          [
            "no",
            "eatingUI.opt_yn_no"
          ],
          [
            "unknown",
            "eatingUI.opt_yn_unknown"
          ]
        ]
      }
    ]
  },
  {
    "id": "function",
    "label": "eatingUI.section_function",
    "questions": [
      {
        "id": "function.work",
        "label": "eatingUI.q_function_work",
        "options": [
          [
            "none",
            "eatingUI.opt_impact_none"
          ],
          [
            "mild",
            "eatingUI.opt_impact_mild"
          ],
          [
            "moderate",
            "eatingUI.opt_impact_moderate"
          ],
          [
            "severe",
            "eatingUI.opt_impact_severe"
          ],
          [
            "na",
            "eatingUI.opt_impact_na"
          ],
          [
            "unknown",
            "eatingUI.opt_impact_unknown"
          ]
        ]
      },
      {
        "id": "function.school",
        "label": "eatingUI.q_function_school",
        "options": [
          [
            "none",
            "eatingUI.opt_impact_none"
          ],
          [
            "mild",
            "eatingUI.opt_impact_mild"
          ],
          [
            "moderate",
            "eatingUI.opt_impact_moderate"
          ],
          [
            "severe",
            "eatingUI.opt_impact_severe"
          ],
          [
            "na",
            "eatingUI.opt_impact_na"
          ],
          [
            "unknown",
            "eatingUI.opt_impact_unknown"
          ]
        ]
      },
      {
        "id": "function.relationships",
        "label": "eatingUI.q_function_relationships",
        "options": [
          [
            "none",
            "eatingUI.opt_impact_none"
          ],
          [
            "mild",
            "eatingUI.opt_impact_mild"
          ],
          [
            "moderate",
            "eatingUI.opt_impact_moderate"
          ],
          [
            "severe",
            "eatingUI.opt_impact_severe"
          ],
          [
            "na",
            "eatingUI.opt_impact_na"
          ],
          [
            "unknown",
            "eatingUI.opt_impact_unknown"
          ]
        ]
      },
      {
        "id": "function.socialEating",
        "label": "eatingUI.q_function_socialEating",
        "options": [
          [
            "none",
            "eatingUI.opt_impact_none"
          ],
          [
            "mild",
            "eatingUI.opt_impact_mild"
          ],
          [
            "moderate",
            "eatingUI.opt_impact_moderate"
          ],
          [
            "severe",
            "eatingUI.opt_impact_severe"
          ],
          [
            "na",
            "eatingUI.opt_impact_na"
          ],
          [
            "unknown",
            "eatingUI.opt_impact_unknown"
          ]
        ]
      },
      {
        "id": "function.finances",
        "label": "eatingUI.q_function_finances",
        "options": [
          [
            "none",
            "eatingUI.opt_impact_none"
          ],
          [
            "mild",
            "eatingUI.opt_impact_mild"
          ],
          [
            "moderate",
            "eatingUI.opt_impact_moderate"
          ],
          [
            "severe",
            "eatingUI.opt_impact_severe"
          ],
          [
            "na",
            "eatingUI.opt_impact_na"
          ],
          [
            "unknown",
            "eatingUI.opt_impact_unknown"
          ]
        ]
      },
      {
        "id": "function.concentration",
        "label": "eatingUI.q_function_concentration",
        "options": [
          [
            "none",
            "eatingUI.opt_impact_none"
          ],
          [
            "mild",
            "eatingUI.opt_impact_mild"
          ],
          [
            "moderate",
            "eatingUI.opt_impact_moderate"
          ],
          [
            "severe",
            "eatingUI.opt_impact_severe"
          ],
          [
            "na",
            "eatingUI.opt_impact_na"
          ],
          [
            "unknown",
            "eatingUI.opt_impact_unknown"
          ]
        ]
      },
      {
        "id": "function.physical",
        "label": "eatingUI.q_function_physical",
        "options": [
          [
            "none",
            "eatingUI.opt_impact_none"
          ],
          [
            "mild",
            "eatingUI.opt_impact_mild"
          ],
          [
            "moderate",
            "eatingUI.opt_impact_moderate"
          ],
          [
            "severe",
            "eatingUI.opt_impact_severe"
          ],
          [
            "na",
            "eatingUI.opt_impact_na"
          ],
          [
            "unknown",
            "eatingUI.opt_impact_unknown"
          ]
        ]
      },
      {
        "id": "function.exercise",
        "label": "eatingUI.q_function_exercise",
        "options": [
          [
            "none",
            "eatingUI.opt_impact_none"
          ],
          [
            "mild",
            "eatingUI.opt_impact_mild"
          ],
          [
            "moderate",
            "eatingUI.opt_impact_moderate"
          ],
          [
            "severe",
            "eatingUI.opt_impact_severe"
          ],
          [
            "na",
            "eatingUI.opt_impact_na"
          ],
          [
            "unknown",
            "eatingUI.opt_impact_unknown"
          ]
        ]
      },
      {
        "id": "function.social",
        "label": "eatingUI.q_function_social",
        "options": [
          [
            "none",
            "eatingUI.opt_impact_none"
          ],
          [
            "mild",
            "eatingUI.opt_impact_mild"
          ],
          [
            "moderate",
            "eatingUI.opt_impact_moderate"
          ],
          [
            "severe",
            "eatingUI.opt_impact_severe"
          ],
          [
            "na",
            "eatingUI.opt_impact_na"
          ],
          [
            "unknown",
            "eatingUI.opt_impact_unknown"
          ]
        ]
      },
      {
        "id": "function.sleep",
        "label": "eatingUI.q_function_sleep",
        "options": [
          [
            "none",
            "eatingUI.opt_impact_none"
          ],
          [
            "mild",
            "eatingUI.opt_impact_mild"
          ],
          [
            "moderate",
            "eatingUI.opt_impact_moderate"
          ],
          [
            "severe",
            "eatingUI.opt_impact_severe"
          ],
          [
            "na",
            "eatingUI.opt_impact_na"
          ],
          [
            "unknown",
            "eatingUI.opt_impact_unknown"
          ]
        ]
      },
      {
        "id": "function.routine",
        "label": "eatingUI.q_function_routine",
        "options": [
          [
            "none",
            "eatingUI.opt_impact_none"
          ],
          [
            "mild",
            "eatingUI.opt_impact_mild"
          ],
          [
            "moderate",
            "eatingUI.opt_impact_moderate"
          ],
          [
            "severe",
            "eatingUI.opt_impact_severe"
          ],
          [
            "na",
            "eatingUI.opt_impact_na"
          ],
          [
            "unknown",
            "eatingUI.opt_impact_unknown"
          ]
        ]
      },
      {
        "id": "function.selfCare",
        "label": "eatingUI.q_function_selfCare",
        "options": [
          [
            "none",
            "eatingUI.opt_impact_none"
          ],
          [
            "mild",
            "eatingUI.opt_impact_mild"
          ],
          [
            "moderate",
            "eatingUI.opt_impact_moderate"
          ],
          [
            "severe",
            "eatingUI.opt_impact_severe"
          ],
          [
            "na",
            "eatingUI.opt_impact_na"
          ],
          [
            "unknown",
            "eatingUI.opt_impact_unknown"
          ]
        ]
      }
    ]
  },
  {
    "id": "physical",
    "label": "eatingUI.section_physical",
    "questions": [
      {
        "id": "physical.dizziness",
        "label": "eatingUI.q_physical_dizziness",
        "options": [
          [
            "yes",
            "eatingUI.opt_yn_yes"
          ],
          [
            "no",
            "eatingUI.opt_yn_no"
          ],
          [
            "unknown",
            "eatingUI.opt_yn_unknown"
          ]
        ]
      },
      {
        "id": "physical.weakness",
        "label": "eatingUI.q_physical_weakness",
        "options": [
          [
            "yes",
            "eatingUI.opt_yn_yes"
          ],
          [
            "no",
            "eatingUI.opt_yn_no"
          ],
          [
            "unknown",
            "eatingUI.opt_yn_unknown"
          ]
        ]
      },
      {
        "id": "physical.dehydration",
        "label": "eatingUI.q_physical_dehydration",
        "options": [
          [
            "yes",
            "eatingUI.opt_yn_yes"
          ],
          [
            "no",
            "eatingUI.opt_yn_no"
          ],
          [
            "unknown",
            "eatingUI.opt_yn_unknown"
          ]
        ]
      },
      {
        "id": "physical.palpitations",
        "label": "eatingUI.q_physical_palpitations",
        "options": [
          [
            "yes",
            "eatingUI.opt_yn_yes"
          ],
          [
            "no",
            "eatingUI.opt_yn_no"
          ],
          [
            "unknown",
            "eatingUI.opt_yn_unknown"
          ]
        ]
      },
      {
        "id": "physical.vomiting",
        "label": "eatingUI.q_physical_vomiting",
        "options": [
          [
            "yes",
            "eatingUI.opt_yn_yes"
          ],
          [
            "no",
            "eatingUI.opt_yn_no"
          ],
          [
            "unknown",
            "eatingUI.opt_yn_unknown"
          ]
        ]
      },
      {
        "id": "physical.constipation",
        "label": "eatingUI.q_physical_constipation",
        "options": [
          [
            "yes",
            "eatingUI.opt_yn_yes"
          ],
          [
            "no",
            "eatingUI.opt_yn_no"
          ],
          [
            "unknown",
            "eatingUI.opt_yn_unknown"
          ]
        ]
      },
      {
        "id": "physical.reproductive",
        "label": "eatingUI.q_physical_reproductive",
        "options": [
          [
            "yes",
            "eatingUI.opt_yn_yes"
          ],
          [
            "no",
            "eatingUI.opt_yn_no"
          ],
          [
            "unknown",
            "eatingUI.opt_yn_unknown"
          ]
        ]
      },
      {
        "id": "physical.dental",
        "label": "eatingUI.q_physical_dental",
        "options": [
          [
            "yes",
            "eatingUI.opt_yn_yes"
          ],
          [
            "no",
            "eatingUI.opt_yn_no"
          ],
          [
            "unknown",
            "eatingUI.opt_yn_unknown"
          ]
        ]
      },
      {
        "id": "physical.cold",
        "label": "eatingUI.q_physical_cold",
        "options": [
          [
            "yes",
            "eatingUI.opt_yn_yes"
          ],
          [
            "no",
            "eatingUI.opt_yn_no"
          ],
          [
            "unknown",
            "eatingUI.opt_yn_unknown"
          ]
        ]
      },
      {
        "id": "physical.decline",
        "label": "eatingUI.q_physical_decline",
        "options": [
          [
            "yes",
            "eatingUI.opt_yn_yes"
          ],
          [
            "no",
            "eatingUI.opt_yn_no"
          ],
          [
            "unknown",
            "eatingUI.opt_yn_unknown"
          ]
        ]
      }
    ]
  },
  {
    "id": "causes",
    "label": "eatingUI.section_causes",
    "questions": [
      {
        "id": "medical.gi",
        "label": "eatingUI.q_medical_gi",
        "options": [
          [
            "yes",
            "eatingUI.opt_yn_yes"
          ],
          [
            "no",
            "eatingUI.opt_yn_no"
          ],
          [
            "unknown",
            "eatingUI.opt_yn_unknown"
          ]
        ]
      },
      {
        "id": "medical.contribution",
        "label": "eatingUI.q_medical_contribution",
        "options": [
          [
            "yes",
            "eatingUI.opt_yn_yes"
          ],
          [
            "no",
            "eatingUI.opt_yn_no"
          ],
          [
            "unknown",
            "eatingUI.opt_yn_unknown"
          ]
        ]
      },
      {
        "id": "substance.medication",
        "label": "eatingUI.q_substance_medication",
        "options": [
          [
            "yes",
            "eatingUI.opt_yn_yes"
          ],
          [
            "no",
            "eatingUI.opt_yn_no"
          ],
          [
            "unknown",
            "eatingUI.opt_yn_unknown"
          ]
        ]
      },
      {
        "id": "substance.contribution",
        "label": "eatingUI.q_substance_contribution",
        "options": [
          [
            "yes",
            "eatingUI.opt_yn_yes"
          ],
          [
            "no",
            "eatingUI.opt_yn_no"
          ],
          [
            "unknown",
            "eatingUI.opt_yn_unknown"
          ]
        ]
      },
      {
        "id": "context.access",
        "label": "eatingUI.q_context_access",
        "options": [
          [
            "yes",
            "eatingUI.opt_yn_yes"
          ],
          [
            "no",
            "eatingUI.opt_yn_no"
          ],
          [
            "unknown",
            "eatingUI.opt_yn_unknown"
          ]
        ]
      }
    ]
  },
  {
    "id": "context",
    "label": "eatingUI.section_context",
    "questions": [
      {
        "id": "context.mood",
        "label": "eatingUI.q_context_mood",
        "options": [
          [
            "yes",
            "eatingUI.opt_yn_yes"
          ],
          [
            "no",
            "eatingUI.opt_yn_no"
          ],
          [
            "unknown",
            "eatingUI.opt_yn_unknown"
          ]
        ]
      },
      {
        "id": "context.anxiety",
        "label": "eatingUI.q_context_anxiety",
        "options": [
          [
            "yes",
            "eatingUI.opt_yn_yes"
          ],
          [
            "no",
            "eatingUI.opt_yn_no"
          ],
          [
            "unknown",
            "eatingUI.opt_yn_unknown"
          ]
        ]
      },
      {
        "id": "context.ocd",
        "label": "eatingUI.q_context_ocd",
        "options": [
          [
            "yes",
            "eatingUI.opt_yn_yes"
          ],
          [
            "no",
            "eatingUI.opt_yn_no"
          ],
          [
            "unknown",
            "eatingUI.opt_yn_unknown"
          ]
        ]
      },
      {
        "id": "context.trauma",
        "label": "eatingUI.q_context_trauma",
        "options": [
          [
            "yes",
            "eatingUI.opt_yn_yes"
          ],
          [
            "no",
            "eatingUI.opt_yn_no"
          ],
          [
            "unknown",
            "eatingUI.opt_yn_unknown"
          ]
        ]
      },
      {
        "id": "context.adhd",
        "label": "eatingUI.q_context_adhd",
        "options": [
          [
            "yes",
            "eatingUI.opt_yn_yes"
          ],
          [
            "no",
            "eatingUI.opt_yn_no"
          ],
          [
            "unknown",
            "eatingUI.opt_yn_unknown"
          ]
        ]
      }
    ]
  }
];
for(const section of A.sections)for(const q of section.questions){q.label=I18n.pair(q.label);q.options=q.options.map(([v,k])=>[v,...I18n.pair(k)]);}
A.questions=A.sections.flatMap(s=>s.questions);
})(globalThis.Eating=globalThis.Eating||{});
