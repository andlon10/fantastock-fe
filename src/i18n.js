import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const LANGUAGE_STORAGE_KEY = "fantastock-language";
const defaultLanguage = "en";
const initialLanguage =
  typeof window !== "undefined"
    ? window.localStorage.getItem(LANGUAGE_STORAGE_KEY) || defaultLanguage
    : defaultLanguage;

// TODO move to a json file
const resources = {
  en: {
    translation: {
      app: {
        name: "Fantastock",
        version: "v0.1.0-alpha",
        githubAriaLabel: "GitHub",
        footerMadeWith: "Made with",
        footerBy: "by",
        switchToEnglish: "Switch language to English",
        switchToItalian: "Switch language to Italian",
      },
      common: {
        loading: "Loading...",
        cancel: "Cancel",
        noDataAvailable: "No data available",
        na: "N/A",
        unknown: "Unknown",
        searchPlayerLabel: "Search Player",
        typeToSearch: "Type to search...",
        selectPlayer: "Select player",
        addPlayerSlot: "Add player slot",
        removePlayerSlot: "Remove this player slot",
        positions: {
          GK: "GK",
          DEF: "DEF",
          MID: "MID",
          FW: "FW",
        },
      },
      home: {
        badge: "Serie A Fantasy Intelligence",
        title: "Draft smarter. Compare deeper. Build a winning fantasy roster.",
        subtitle:
          "Fantastock brings player comparison analytics and live auction planning into one place, so every bid and every pick is backed by data.",
        openComparator: "Open Comparator",
        openAuctionPlanner: "Go To Auction Planner",
        openOfferComparator: "Compare Trade Offers",
        comparatorChip: "Player Comparator",
        comparatorTitle: "Compare two players from every angle",
        comparatorDescription:
          "Side-by-side stats, radar profile, heatmap analysis, and nearest-player insights to evaluate form, style, and value before you commit.",
        radarChart: "Radar Chart",
        shotHeatmap: "Shot Heatmap",
        similarPlayers: "Similar Players",
        startComparing: "Start comparing",
        auctionChip: "Auction Planner",
        auctionTitle: "Run your draft with budget clarity",
        auctionDescription:
          "Build your full roster by position, assign bid amounts, track spending in real time, and keep your board available across refreshes with saved progress.",
        budgetPie: "Budget Pie",
        positionBreakdown: "Position Breakdown",
        savedSelection: "Saved Selection",
        planAuction: "Plan your auction",
        offerComparatorChip: "Offer Comparator",
        offerComparatorTitle: "Evaluate multi-player trade offers",
        offerComparatorDescription:
          "Compare bundles of up to five players per side with a single performance score and detailed stat breakdown.",
        upToFiveVsFive: "Up to 5 vs 5",
        performanceScore: "Performance score",
        tradeVerdict: "Trade verdict",
        compareOffers: "Compare offers",
      },
      auction: {
        title: "Auction",
        clearSelection: "Clear selection",
        clearDialogTitle: "Clear current selection?",
        clearDialogBody:
          "This will remove all selected players and entered bid amounts from the auction board.",
        budgetOverview: "Budget Overview",
        totalBudget: "Total Budget",
        totalSpent: "Total Spent",
        remainingBudget: "Remaining Budget",
        adjustBudgetLabel: "Adjust Total Budget:",
        adjustBudgetHelper:
          "Enter each player bid in the roster columns below to update spending totals.",
        spendingByPosition: "Spending by Position",
        playerSlotLabel: "Player {{index}}",
        searchPlayerPlaceholder: "Search player...",
        playerRequired: "Player is required",
        amountRequired: "Amount is required",
        amountMustBePositive: "Must be > 0",
        bidAmountAriaLabel: "{{position}} player {{index}} bid amount",
      },
      comparator: {
        title: "Comparator",
        playerOne: "Player 1",
        playerTwo: "Player 2",
        metricsTitle: "Player metrics comparison",
        metricsDescription:
          "Side-by-side comparison of the same metrics shown in the Player Metrics card.",
        shotHeatmapsTitle: "Shot heatmaps",
        shotHeatmapsDescription: "Visualize where each player takes their shots on the pitch.",
        similarPlayersTitle: "Similar players",
        similarPlayersDescription:
          "A list of players with similar performance indicators. Percentages are relevant to the selected player and indicate how much better or worse the similar player is compared to the selected one.",
        bonusPerformanceTitle: "Bonus Point Performance",
        bonusPerformanceDescription:
          "Compare the bonus point performance of each player across the season.",
        bonusOverTime: {
          selectPlayer: "Select a player to view bonus over time.",
          title: "Bonus Over Time",
          titleWithPlayer: "Bonus Over Time: {{playerName}}",
          titleWithSlot: "Bonus Over Time: {{slot}}",
          description:
            "Stacked by scoring rule: goals (+3), assists (+1), penalty saves (+3), missed penalties (-3), yellow cards (-0.5), red cards (-1).",
          noData: "No played fixture data available.",
          gw: "GW",
          fantasyPoints: "Fantasy points",
          playerId: "Player ID: {{playerId}}",
          series: {
            goals: "Goals (3 pts)",
            assists: "Assists (1 pt)",
            penaltySaves: "Penalty Saves (3 pts)",
            missedPenalties: "Missed Penalties (-3 pts)",
            yellowCards: "Yellow Cards (-0.5)",
            redCards: "Red Cards (-1)",
          },
        },
        radarTitle: "Bonus points metrics",
        radarDescription:
          "Each axis is normalised to a 0-10 scale based on typical performance ranges.",
        table: {
          metricHeading: "Metric",
          playerOneHeading: "Player 1",
          playerTwoHeading: "Player 2",
          emptyValue: "-",
        },
        metricDefinitions: {
          PI: {
            label: "PI",
            description: "Performance Indicator: composite score of overall player output.",
          },
          FOI: {
            label: "FOI",
            description:
              "Form Over/Under Index: how current form compares to baseline expectation.",
          },
          ProjectionGap: {
            label: "Projection Gap",
            description: "Difference between projected output and current performance.",
          },
          Goals: {
            label: "Goals",
            description: "Total goals scored in the selected dataset.",
          },
          Assists: {
            label: "Assists",
            description: "Total assists recorded in the selected dataset.",
          },
          xG: {
            label: "xG",
            description: "Expected Goals: quality-weighted chance value of shots.",
          },
          xA: {
            label: "xA",
            description: "Expected Assists: quality-weighted chance creation value.",
          },
          Minutes: {
            label: "Minutes",
            description: "Total minutes played.",
          },
        },
      },
      tradeComparator: {
        title: "Offer Comparator",
        description:
          "Select two sets of players and estimate which side projects to deliver stronger fantasy performance.",
        offerA: "Offer A",
        offerB: "Offer B",
        addSlot: "Add player",
        playerSlot: "Player {{index}}",
        selectPlayersHint: "Select at least one player in either side to calculate the comparison.",
        verdictTitle: "Offer Verdict",
        verdictDescription:
          "The score is a weighted heuristic based on PI, total points, attacking output, and form indicators.",
        tie: "Both offers are very close",
        favorsA: "Offer A projects better",
        favorsB: "Offer B projects better",
        scoreOfferA: "Offer A score",
        scoreOfferB: "Offer B score",
        confidence: "Confidence",
        breakdownTitle: "Stat Breakdown",
        breakdownDescription: "Side-by-side totals and rates used for the final score.",
        metric: "Metric",
        playersSelected: "Players selected",
        totalPI: "Total PI",
        avgPI: "Average PI",
        totalPoints: "Total points",
        goalContributions: "Goal contributions",
        contributionsPer90: "G+A per 90",
        xContributionsPer90: "xG+xA per 90",
        avgFOI: "Average FOI",
        tooltips: {
          scoreOfferA: "Weighted projected performance score for the players selected in Offer A.",
          scoreOfferB: "Weighted projected performance score for the players selected in Offer B.",
          confidence:
            "Percent gap between scores: |A-B| / higher score. Higher means a clearer edge.",
        },
      },
      charts: {
        labels: {
          goals: "Goals",
          shots: "Shots",
          bonus: "Bonus",
          positionAverage: "Position Avg",
          goalsPer90: "Goals/90",
          assistsPer90: "Assists/90",
          contributionsPer90: "G+A/90",
          xGPer90: "xG/90",
          xAPer90: "xA/90",
          pi: "PI",
          piScaled: "PI (scaled)",
        },
        fixturePerformance: {
          title: "{{player}} - Seasonal performance (Season {{season}})",
          defaultPlayer: "Player",
          notPlayed: "Did not play",
          noBonus: "No bonus",
          matchday: "Matchday",
          points: "Points",
          unavailable: "N/A",
          error: "Failed to load fixture performance data",
        },
        tooltips: {
          minute: "Minute",
          result: "Result",
          scaledValue: "{{value}} (scaled: {{scaled}}/10)",
        },
        emptySimilarPlayers: "No similar players found.",
        similarPlayersListTitle: "Players with similar performance indicators",
        countedAsShot: "Counted as Shot",
      },
      playerMetricsCard: {
        projectionGap: "Projection Gap",
        goals: "Goals",
        assists: "Assists",
        minutes: "Minutes",
      },
      playerInformation: {
        position: "Position",
        goals: "Goals",
        assists: "Assists",
        minutes: "Minutes",
      },
    },
  },
  it: {
    translation: {
      app: {
        name: "Fantastock",
        version: "v0.1.0-alpha",
        githubAriaLabel: "GitHub",
        footerMadeWith: "Creato con",
        footerBy: "da",
        switchToEnglish: "Passa alla lingua inglese",
        switchToItalian: "Passa alla lingua italiana",
      },
      common: {
        loading: "Caricamento...",
        cancel: "Annulla",
        noDataAvailable: "Nessun dato disponibile",
        na: "N/D",
        unknown: "Sconosciuto",
        searchPlayerLabel: "Cerca giocatore",
        typeToSearch: "Digita per cercare...",
        selectPlayer: "Seleziona un giocatore",
        addPlayerSlot: "Aggiungi slot giocatore",
        removePlayerSlot: "Rimuovi questo slot giocatore",
        positions: {
          GK: "P",
          DEF: "DIF",
          MID: "CEN",
          FW: "ATT",
        },
      },
      home: {
        badge: "Analisi fantacalcio Serie A",
        title: "Costruisci una rosa vincente con lo strumento definitivo per il fantacalcio.",
        subtitle:
          "Fantastock offre analisi delle performance dei giocatori e pianificazione aste in tempo reale.",
        openComparator: "Apri comparatore",
        openAuctionPlanner: "Vai allo strumento per l'asta",
        openOfferComparator: "Confronta offerte",
        comparatorChip: "Comparatore giocatori",
        comparatorTitle: "Confronta due giocatori da molteplici prospettive",
        comparatorDescription:
          "Statistiche, confronto performance, heatmap dei tiri e giocatori simili per valutare forma e valore prima di scambiare.",
        radarChart: "Grafico radar",
        shotHeatmap: "Heatmap tiri",
        similarPlayers: "Giocatori simili",
        startComparing: "Inizia il confronto",
        auctionChip: "Planner asta",
        auctionTitle: "Gestisci l'asta con il tuo budget diviso per ruolo",
        auctionDescription:
          "Costruisci l'intera rosa per ruolo, inserisci il costo dei giocatori e monitora la spesa in tempo reale",
        budgetPie: "Torta budget",
        positionBreakdown: "Ripartizione per ruolo",
        savedSelection: "Selezione salvata",
        planAuction: "Pianifica l'asta",
        offerComparatorChip: "Comparatore offerte",
        offerComparatorTitle: "Valuta scambi con piu giocatori",
        offerComparatorDescription:
          "Confronta pacchetti fino a cinque giocatori per lato con un punteggio unico e una vista dettagliata delle metriche.",
        upToFiveVsFive: "Fino a 5 vs 5",
        performanceScore: "Punteggio performance",
        tradeVerdict: "Verdetto scambio",
        compareOffers: "Confronta offerte",
      },
      auction: {
        title: "Asta",
        clearSelection: "Annulla selezione",
        clearDialogTitle: "Annullare la selezione corrente?",
        clearDialogBody:
          "Questa azione rimuoverà tutti i giocatori selezionati e gli importi inseriti per ogni giocatore.",
        budgetOverview: "Panoramica budget",
        totalBudget: "Budget totale",
        totalSpent: "Spesa totale",
        remainingBudget: "Budget residuo",
        adjustBudgetLabel: "Modifica budget totale:",
        adjustBudgetHelper:
          "Inserisci l'offerta di ogni giocatore nelle colonne della rosa per aggiornare i costi.",
        spendingByPosition: "Spesa per ruolo",
        playerSlotLabel: "Giocatore {{index}}",
        searchPlayerPlaceholder: "Cerca giocatore...",
        playerRequired: "Il giocatore è obbligatorio",
        amountRequired: "L'importo è obbligatorio",
        amountMustBePositive: "Deve essere > 0",
        bidAmountAriaLabel: "offerta per {{position}} giocatore {{index}}",
      },
      comparator: {
        title: "Comparatore",
        playerOne: "Giocatore 1",
        playerTwo: "Giocatore 2",
        metricsTitle: "Confronto metriche giocatore",
        metricsDescription:
          "Confronto affiancato delle stesse metriche mostrate nella scheda Metriche Giocatore.",
        shotHeatmapsTitle: "Heatmap dei tiri",
        shotHeatmapsDescription: "Visualizza da dove ogni giocatore conclude sul campo.",
        similarPlayersTitle: "Giocatori simili",
        similarPlayersDescription:
          "Elenco di giocatori con indicatori di performance simili. Le percentuali sono riferite al giocatore selezionato e indicano quanto il giocatore simile sia migliore o peggiore.",
        bonusPerformanceTitle: "Performance punti bonus",
        bonusPerformanceDescription:
          "Confronta l'andamento dei punti bonus di ciascun giocatore durante la stagione.",
        bonusOverTime: {
          selectPlayer: "Seleziona un giocatore per visualizzare i bonus nel tempo.",
          title: "Bonus nel tempo",
          titleWithPlayer: "Bonus nel tempo: {{playerName}}",
          titleWithSlot: "Bonus nel tempo: {{slot}}",
          description:
            "Impilato per regola di punteggio: gol (+3), assist (+1), rigori parati (+3), rigori sbagliati (-3), ammonizioni (-0.5), espulsioni (-1).",
          noData: "Nessun dato disponibile per le giornate giocate.",
          gw: "G",
          fantasyPoints: "Punti fantacalcio",
          playerId: "ID giocatore: {{playerId}}",
          series: {
            goals: "Gol (3 pt)",
            assists: "Assist (1 pt)",
            penaltySaves: "Rigori parati (3 pt)",
            missedPenalties: "Rigori sbagliati (-3 pt)",
            yellowCards: "Ammonizioni (-0.5)",
            redCards: "Espulsioni (-1)",
          },
        },
        radarTitle: "Metriche punti bonus",
        radarDescription:
          "Ogni asse è normalizzato su una scala 0-10 in base ai range di performance.",
        table: {
          metricHeading: "Metrica",
          playerOneHeading: "Giocatore 1",
          playerTwoHeading: "Giocatore 2",
          emptyValue: "-",
        },
        metricDefinitions: {
          PI: {
            label: "PI",
            description:
              "Performance Indicator: punteggio composito della produzione complessiva del giocatore.",
          },
          FOI: {
            label: "FOI",
            description:
              "Form Over/Under Index: misura come la forma attuale si confronta con l'aspettativa di base.",
          },
          ProjectionGap: {
            label: "Projection Gap",
            description: "Differenza tra output previsto e performance attuale.",
          },
          Goals: {
            label: "Gol",
            description: "Gol totali segnati nel dataset selezionato.",
          },
          Assists: {
            label: "Assist",
            description: "Assist totali registrati nel dataset selezionato.",
          },
          xG: {
            label: "xG",
            description: "Expected Goals: valore dei tiri pesato per qualità.",
          },
          xA: {
            label: "xA",
            description:
              "Expected Assists: valore della creazione di occasioni pesato per qualità.",
          },
          Minutes: {
            label: "Minuti",
            description: "Minuti totali giocati.",
          },
        },
      },
      tradeComparator: {
        title: "Comparatore offerte",
        description:
          "Seleziona due set di giocatori e stima quale lato puo offrire performance fantacalcio migliori.",
        offerA: "Offerta A",
        offerB: "Offerta B",
        addSlot: "Aggiungi giocatore",
        playerSlot: "Giocatore {{index}}",
        selectPlayersHint:
          "Seleziona almeno un giocatore in uno dei due lati per calcolare il confronto.",
        verdictTitle: "Verdetto offerta",
        verdictDescription:
          "Il punteggio e una stima pesata basata su PI, punti totali, output offensivo e indicatori di forma.",
        tie: "Le due offerte sono molto vicine",
        favorsA: "L'offerta A e migliore",
        favorsB: "L'offerta B e migliore",
        scoreOfferA: "Punteggio offerta A",
        scoreOfferB: "Punteggio offerta B",
        confidence: "Confidenza",
        breakdownTitle: "Dettaglio metriche",
        breakdownDescription: "Totali e medie affiancate utilizzate per il punteggio finale.",
        metric: "Metrica",
        playersSelected: "Giocatori selezionati",
        totalPI: "PI totale",
        avgPI: "PI medio",
        totalPoints: "Punti totali",
        goalContributions: "Contributi gol",
        contributionsPer90: "G+A per 90",
        xContributionsPer90: "xG+xA per 90",
        avgFOI: "FOI medio",
        tooltips: {
          scoreOfferA:
            "Punteggio di performance stimata pesata per i giocatori selezionati nell'offerta A.",
          scoreOfferB:
            "Punteggio di performance stimata pesata per i giocatori selezionati nell'offerta B.",
          confidence:
            "Scarto percentuale: |A-B| / punteggio piu alto. Piu alto = vantaggio piu netto.",
        },
      },
      charts: {
        labels: {
          goals: "Gol",
          shots: "Tiri",
          bonus: "Bonus",
          positionAverage: "Media ruolo",
          goalsPer90: "Gol/90",
          assistsPer90: "Assist/90",
          contributionsPer90: "G+A/90",
          xGPer90: "xG/90",
          xAPer90: "xA/90",
          pi: "PI",
          piScaled: "PI (scalato)",
        },
        fixturePerformance: {
          title: "{{player}} - Performance stagionale (Stagione {{season}})",
          defaultPlayer: "Giocatore",
          notPlayed: "Non ha giocato",
          noBonus: "Nessun bonus",
          matchday: "Giornata",
          points: "Punti",
          unavailable: "N/D",
          error: "Impossibile caricare i dati di performance per giornata",
        },
        tooltips: {
          minute: "Minuto",
          result: "Esito",
          scaledValue: "{{value}} (scalato: {{scaled}}/10)",
        },
        emptySimilarPlayers: "Nessun giocatore simile trovato.",
        similarPlayersListTitle: "Giocatori con indicatori di performance simili",
        countedAsShot: "Conteggiato come tiro",
      },
      playerMetricsCard: {
        projectionGap: "Projection Gap",
        goals: "Gol",
        assists: "Assist",
        minutes: "Minuti",
      },
      playerInformation: {
        position: "Ruolo",
        goals: "Gol",
        assists: "Assist",
        minutes: "Minuti",
      },
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: initialLanguage,
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

i18n.on("languageChanged", language => {
  if (typeof window !== "undefined") {
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
  }
});

export default i18n;
