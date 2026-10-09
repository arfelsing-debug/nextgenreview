/**
 * Adamas editorial selection 2.1
 * Pure, audit-friendly, domain-aware paragraphs from already approved scores.
 * Deliberately separates the interpretive portrait, evidentiary analysis,
 * hypothetical scenarios and the existing action plan.
 */
export const EDITORIAL_VERSION='2.1.0';
const supported=['en','cs','de'];
const relation={
 family:[[2,3],[1,2],[4,5],[0,3]],
 nextgen:[[1,2],[2,3],[3,4],[4,5]],
 shareholder:[[0,1],[1,3],[2,3],[4,5]],
 adviser:[[0,1],[2,3],[4,5]],
 investment:[[0,1],[2,3],[4,5]]
};
const domains={
 family:{
 en:'Within a family, confidence in shared purpose can coexist with unsettled arrangements for authority or succession. The reported comparison between {high} and {low} is worth considering through the decisions the family will eventually have to take together.',
 cs:'V rodině může společný účel fungovat současně s nevyjasněnými pravomocemi či nástupnictvím. Vztah mezi oblastmi „{high}“ a „{low}“ je vhodné chápat v souvislosti s rozhodnutími, která budou členové rodiny muset společně přijmout.',
 de:'In einer Familie kann Einigkeit über gemeinsame Ziele mit ungeklärten Zuständigkeiten oder Nachfolgefragen einhergehen. Das Verhältnis zwischen „{high}“ und „{low}“ sollte anhand anstehender gemeinsamer Entscheidungen betrachtet werden.'
 },
 nextgen:{
 en:'Preparation for ownership depends on opportunities to exercise judgement as well as access to information. Read {high} alongside {low} with this progression in mind: what responsibility can the respondent already explain, and what has actually been practised?',
 cs:'Příprava na vlastnictví vyžaduje vedle přístupu k informacím také příležitosti samostatně rozhodovat. Oblasti „{high}“ a „{low}“ je proto užitečné číst ve vztahu k postupnému přebírání odpovědnosti: co respondent již chápe a co si skutečně vyzkoušel?',
 de:'Die Vorbereitung auf Eigentümerverantwortung braucht neben Informationen auch Gelegenheiten, eigenes Urteil zu üben. Die Bereiche „{high}“ und „{low}“ sollten deshalb gemeinsam gelesen werden: Welche Verantwortung kann die befragte Person erklären, und welche wurde bereits praktisch übernommen?'
 },
 shareholder:{
 en:'Shareholder preparedness depends on the relationship between rights, financial understanding and the practical routes for making decisions. Read {high} alongside {low} with attention to what an owner could do independently when a vote or material change is proposed.',
 cs:'Připravenost vlastníka závisí na souvislosti mezi právy, finančním porozuměním a skutečnými postupy rozhodování. Oblasti „{high}“ a „{low}“ je vhodné posuzovat podle toho, co může vlastník samostatně udělat při hlasování či významné změně.',
 de:'Die Vorbereitung als Anteilseigner hängt vom Zusammenspiel der Rechte, des finanziellen Verständnisses und der tatsächlichen Entscheidungswege ab. Die Bereiche „{high}“ und „{low}“ sollten danach betrachtet werden, was ein Eigentümer bei einer Abstimmung oder wesentlichen Veränderung eigenständig tun kann.'
 },
 adviser:{
 en:'An effective adviser relationship requires an understood mandate, accountable decisions and coordination where professional views differ. Consider the reported positions of {high} and {low} through an example in which advice crossed organisational boundaries.',
 cs:'Fungující vztah s poradci předpokládá srozumitelný mandát, jasnou odpovědnost a koordinaci při rozdílných odborných názorech. Postavení oblastí „{high}“ a „{low}“ proto posuďte na konkrétním příkladu rozhodnutí, které zasahovalo do práce více poradců.',
 de:'Eine funktionierende Beraterbeziehung erfordert ein verständliches Mandat, klare Verantwortlichkeit und Koordination bei unterschiedlichen fachlichen Auffassungen. Die Bereiche „{high}“ und „{low}“ sollten an einer Entscheidung untersucht werden, an der mehrere Berater beteiligt waren.'
 },
 investment:{
 en:'The effectiveness of an investment-management relationship depends on whether the mandate, the investment process, risk oversight and independent reporting support the same purpose. The reported positions of {high} and {low} are relevant to that oversight, rather than to an unsupported forecast of returns.',
 cs:'Kvalita vztahu s investičním manažerem závisí na souladu mandátu, investičního procesu, řízení rizik a nezávislého reportingu. Uváděné hodnocení oblastí „{high}“ a „{low}“ je proto otázkou dohledu, nikoli podkladem pro předpověď výnosů.',
 de:'Die Qualität einer Investmentmanager-Beziehung hängt davon ab, ob Mandat, Anlageprozess, Risikoaufsicht und unabhängige Berichterstattung denselben Zweck unterstützen. Die berichteten Ergebnisse zu „{high}“ und „{low}“ betreffen diese Aufsicht und begründen keine Renditeprognose.'
 }
};
const phrase={
 en:{
 balanced:'The scored dimensions are comparatively even, with {n} of six classified as established. There is no evidenced basis for describing this pattern as uneven. The important qualification is that consistency of responses remains self-reported; performance in practice has not yet been independently established.',
 low:'The scored pattern is broadly exposed, with {n} dimensions in the weaker category. This suggests that preparation may require attention across several connected responsibilities, rather than a single isolated correction. The findings must still be checked against documents and practical experience.',
 developing:'Most scored areas are reported as developing rather than firmly established. The portrait therefore describes a transition in preparedness, where existing knowledge or arrangements may be useful but the evidence of repeatable practice is still uneven.',
 uneven:'There is a material difference between the reported positions of {high} ({highRef}) and {low} ({lowRef}). The contrast may be consequential when decisions require both capabilities. It is an indication for investigation, not a demonstrated failure of either arrangement.',
 level:'The assessed dimensions form a relatively compact group, without a material score gap between {high} and {low}. An artificial ranking would exaggerate the findings. Greater insight may come from examining the specific questions behind those two results.',
 partial:'Only {scored} of 48 answers are scored. The principal finding is restricted visibility: further interpretation would risk confusing an unknown arrangement with an absent one. Relevance, authorised access and missing evidence should be established first.',
 contextual:'The assessed pattern gives a starting account of the respondent’s position within a wider system. Whether that account is widely shared remains unknown. A material difference between the respondent’s understanding and formal authority could affect readiness without appearing directly in any one dimension score.',
 focused:'The clearest substantive question arises from {high} and {low}. Their relative positions should prompt consideration of what the respondent can explain, what has been done in practice and what still depends on another person. These are separate forms of preparedness, and the questionnaire does not independently verify them.',
 uncertainty:'The {unknown} unknown and {na} not-applicable answers should remain explicitly unscored. A follow-up can distinguish restricted access, genuinely inapplicable responsibilities and unanswered questions; none is proof of a weakness.',
 noEvidence:'The available scored answers are too limited for a meaningful strengths-and-exposures comparison. The immediate need is to establish which questions are applicable, who holds the relevant information and what evidence the respondent may properly access.',
 strength:'The clearest reported strength is {strong} ({strongRef}). This is a favourable questionnaire response, not independent confirmation. Its value depends on whether the reported capability can be demonstrated through a specific authorised example.',
 secondStrength:'A second reported foundation is {second} ({secondRef}). It concerns a different part of the review and may complement the first. The two should be considered separately until practical examples show whether they genuinely support one another.',
 noStrength:'There is no fully scored area presently identified as an established strength. This may reflect limited visibility or an early stage of preparation. The report cannot infer incapacity or institutional failure from that absence.',
 exposure:'The area requiring closest attention is {weak} ({weakRef}), reported as {weakLevel}. Establishing what the responses reflect is more useful than treating the label as a verdict. A missing procedure, an unfamiliar existing procedure and limited personal experience call for different responses.',
 noExposure:'No fully scored pair currently qualifies as developing or exposed. This is an account of the responses, not evidence that all relevant arrangements are resilient. Areas without adequate information remain outside that conclusion.',
 dependency:'A specific dependency may warrant investigation: {left} ({leftRef}) is reported as established while {right} ({rightRef}) is reported as {rightLevel}. The two belong to a pre-identified relationship in this Review’s methodology. Whether the stronger area actually relies upon the weaker one must be checked before drawing a causal conclusion.',
 noDependency:'The relevant scored pairs do not trigger one of the Review’s predefined dependency relationships. This does not establish that no dependency exists; it means the answers do not support naming one here.',
 consequence:'If the reported gap in {weak} is confirmed, it may affect how the family or organisation exercises responsibility beyond that immediate topic. The possible consequence should be documented through an actual decision route, not inferred from a traffic-light colour alone.',
 evidence:'The next evidentiary question concerns {priority} ({priorityRef}), an already selected priority. Agree what record, decision or example would confirm the finding, and identify who may provide it. Timetables and implementation belong in the action plan that follows.'
 },
 cs:{
 balanced:'Hodnocené oblasti vykazují relativně vyrovnaný výsledek a {n} ze šesti je klasifikováno jako zakotvených. Není důvod popisovat tento profil jako nerovnoměrný. Odpovědi však zůstávají sebehodnocením a skutečné fungování nebylo nezávisle ověřeno.',
 low:'Hodnocení je v širším rozsahu zranitelné, přičemž {n} oblastí spadá do slabší kategorie. Příprava tak může vyžadovat pozornost napříč několika souvisejícími odpovědnostmi. Závěr je třeba ověřit podle dokumentů a praktických zkušeností.',
 developing:'Většina hodnocených oblastí je ve stadiu rozvoje. Zjištění tak zachycují průběžnou přípravu, v níž některé znalosti či pravidla již existují, ale důkazy o opakovatelném fungování nejsou dosud rovnoměrné.',
 uneven:'Mezi oblastmi „{high}“ ({highRef}) a „{low}“ ({lowRef}) existuje významný rozdíl v uváděném hodnocení. Může být důležitý při rozhodování, které vyžaduje obě schopnosti. Jde o podnět k prověření, nikoli důkaz selhání.',
 level:'Hodnocené oblasti tvoří poměrně vyrovnanou skupinu bez významného rozdílu mezi „{high}“ a „{low}“. Umělé pořadí by zjištění zkreslilo. Přínosnější je prověřit konkrétní odpovědi v obou oblastech.',
 partial:'Číselné hodnocení má pouze {scored} ze 48 odpovědí. Hlavním zjištěním je omezený přehled: výklad nesmí zaměňovat neznámé uspořádání s neexistujícím. Nejprve je nutné určit relevantnost, oprávněný přístup a potřebné podklady.',
 contextual:'Zjištěný profil představuje výchozí pohled respondenta v širším systému vztahů a odpovědností. Není zřejmé, zda jej sdílejí i další oprávnění účastníci. Rozdíl mezi osobním porozuměním a formální pravomocí může být významný, i když se přímo neprojeví v jednom skóre.',
 focused:'Důležitá otázka vyplývá ze vztahu mezi oblastmi „{high}“ a „{low}“. Je užitečné rozlišit, co respondent umí vysvětlit, co již skutečně vyzkoušel a co závisí na jiné osobě. Dotazník tyto různé formy připravenosti nezávisle nepotvrzuje.',
 uncertainty:'Počet neznámých odpovědí je {unknown} a nerelevantních {na}. Tyto odpovědi zůstávají bez hodnocení. Další ověření musí rozlišit omezený přístup, skutečnou nerelevantnost a nezodpovězené otázky.',
 noEvidence:'Dostupných číselně hodnocených odpovědí je příliš málo pro spolehlivé porovnání silných a slabších oblastí. Nejprve je třeba určit relevantní otázky, držitele informací a oprávněný přístup respondenta.',
 strength:'Nejzřetelnější uváděnou silnou stránkou je oblast „{strong}“ ({strongRef}). Jde o příznivou odpověď, nikoli o nezávislé potvrzení. Její význam závisí na konkrétním oprávněně dostupném příkladu fungování.',
 secondStrength:'Dalším uváděným základem je oblast „{second}“ ({secondRef}). Týká se jiné části hodnocení a může první oblast doplňovat. Vzájemnou podporu je třeba ověřit na konkrétních příkladech.',
 noStrength:'Žádná úplně hodnocená oblast se nyní nejeví jako jednoznačně zakotvená silná stránka. Příčinou může být omezený přehled či počáteční fáze přípravy. Nelze z toho odvozovat neschopnost nebo selhání.',
 exposure:'Největší pozornost si zaslouží oblast „{weak}“ ({weakRef}), uváděná jako {weakLevel}. Důležitější než samotné označení je zjistit, co odpovědi znamenají. Chybějící pravidlo, neznalost existujícího postupu a omezená zkušenost vyžadují odlišné kroky.',
 noExposure:'Žádná úplně hodnocená dvojice nepatří do rozvíjející se či zranitelné kategorie. To samo nedokazuje celkovou odolnost. Nehodnocené oblasti zůstávají mimo tento závěr.',
 dependency:'Možná závislost si zaslouží pozornost: oblast „{left}“ ({leftRef}) je uváděna jako zakotvená, zatímco „{right}“ ({rightRef}) je {rightLevel}. Jde o vztah předem určený metodikou tohoto Review. Skutečnou příčinnou souvislost je nutné ověřit.',
 noDependency:'Hodnocené dvojice nespouštějí žádný z předem určených vztahů závislosti. To neprokazuje neexistenci dalších závislostí; odpovědi však neumožňují konkrétní vztah pojmenovat.',
 consequence:'Pokud se nedostatek v oblasti „{weak}“ potvrdí, může ovlivnit i širší výkon odpovědnosti. Možný důsledek je třeba doložit konkrétním rozhodovacím postupem, nikoli pouze barvou hodnocení.',
 evidence:'Další ověření se týká oblasti „{priority}“ ({priorityRef}), kterou stávající model již vybral jako prioritu. Určete dokument, rozhodnutí či příklad potřebný k potvrzení závěru a oprávněnou osobu, která jej může poskytnout. Harmonogram patří do následujícího plánu.'
 },
 de:{
 balanced:'Die bewerteten Bereiche sind vergleichsweise ausgeglichen; {n} von sechs gelten als gefestigt. Es gibt keine Grundlage, das Profil als unausgewogen darzustellen. Die Antworten sind jedoch Selbstauskünfte; die tatsächliche Praxis wurde nicht unabhängig überprüft.',
 low:'Das bewertete Profil weist breit gestreute Schwachstellen auf; {n} Bereiche liegen in der schwächeren Kategorie. Die Vorbereitung könnte daher mehrere zusammenhängende Verantwortungsbereiche betreffen. Die Befunde sind anhand von Unterlagen und praktischen Erfahrungen zu prüfen.',
 developing:'Die Mehrzahl der bewerteten Bereiche befindet sich im Aufbau. Das Profil beschreibt damit eine Phase der Vorbereitung: Wissen und einzelne Regelungen mögen vorhanden sein, doch die Nachweise für wiederholbare Praxis sind noch nicht gleichmäßig ausgeprägt.',
 uneven:'Zwischen „{high}“ ({highRef}) und „{low}“ ({lowRef}) besteht ein erheblicher Unterschied in den berichteten Ergebnissen. Dieser kann bei Entscheidungen relevant werden, die beide Fähigkeiten voraussetzen. Das ist ein Prüfhinweis und kein nachgewiesenes Versagen.',
 level:'Die bewerteten Bereiche bilden eine relativ geschlossene Gruppe ohne erheblichen Abstand zwischen „{high}“ und „{low}“. Eine künstliche Rangordnung würde die Befunde überzeichnen. Die einzelnen Antworten geben möglicherweise mehr Aufschluss.',
 partial:'Nur {scored} von 48 Antworten wurden numerisch bewertet. Das wesentliche Ergebnis ist eingeschränkte Sichtbarkeit. Eine Interpretation darf eine unbekannte Regelung nicht mit einer fehlenden verwechseln. Klären Sie zunächst Relevanz, berechtigten Zugang und benötigte Nachweise.',
 contextual:'Das Profil zeigt die Sicht der befragten Person innerhalb eines größeren Zusammenhangs von Beziehungen und Verantwortlichkeiten. Ob andere Berechtigte diese Einschätzung teilen, ist unbekannt. Ein Unterschied zwischen persönlichem Verständnis und formaler Befugnis kann erheblich sein, ohne in einem einzelnen Bereichswert sichtbar zu werden.',
 focused:'Die wesentliche Frage ergibt sich aus dem Zusammenspiel von „{high}“ und „{low}“. Unterscheiden Sie, was die befragte Person erklären kann, was sie tatsächlich geübt hat und was weiterhin von anderen abhängt. Der Fragebogen bestätigt diese Aspekte nicht unabhängig.',
 uncertainty:'Es liegen {unknown} unbekannte und {na} nicht anwendbare Antworten vor. Diese bleiben unbewertet. Eine weitere Prüfung muss eingeschränkten Informationszugang, tatsächliche Nichtanwendbarkeit und offene Fragen unterscheiden.',
 noEvidence:'Die verfügbaren bewerteten Antworten reichen für einen belastbaren Vergleich von Stärken und Schwachstellen nicht aus. Klären Sie zuerst, welche Fragen einschlägig sind, wer die Informationen besitzt und welche Unterlagen berechtigt zugänglich sind.',
 strength:'Die deutlichste berichtete Stärke ist „{strong}“ ({strongRef}). Dies ist eine günstige Selbstauskunft, kein unabhängiger Nachweis. Ihr Wert hängt davon ab, ob sich die gelebte Praxis durch ein konkretes, berechtigt zugängliches Beispiel bestätigen lässt.',
 secondStrength:'Eine weitere Grundlage ist „{second}“ ({secondRef}). Sie betrifft einen anderen Teil der Bewertung und kann die erste ergänzen. Ob sich beide tatsächlich gegenseitig tragen, sollte anhand konkreter Beispiele geprüft werden.',
 noStrength:'Kein vollständig bewerteter Bereich gilt derzeit eindeutig als gefestigte Stärke. Dies kann begrenzte Sichtbarkeit oder eine frühe Vorbereitungsphase widerspiegeln. Weder Unfähigkeit noch organisatorisches Versagen lassen sich daraus ableiten.',
 exposure:'Zunächst verdient „{weak}“ ({weakRef}) Aufmerksamkeit, als {weakLevel} berichtet. Entscheidend ist, was hinter dieser Angabe steht. Eine fehlende Regelung, ein bestehender unbekannter Ablauf und begrenzte persönliche Erfahrung erfordern unterschiedliche Reaktionen.',
 noExposure:'Kein vollständig bewertetes Aussagepaar wird derzeit als im Aufbau oder gefährdet eingeordnet. Dies beweist keine allgemeine Widerstandsfähigkeit. Unbewertete Bereiche liegen außerhalb dieser Aussage.',
 dependency:'Eine mögliche Abhängigkeit verdient Prüfung: „{left}“ ({leftRef}) gilt als gefestigt, während „{right}“ ({rightRef}) als {rightLevel} berichtet wird. Dieses Verhältnis ist in der Methodik des Reviews vorab definiert. Ein tatsächlicher ursächlicher Zusammenhang ist damit nicht bewiesen.',
 noDependency:'Die bewerteten Aussagen lösen keine der vorab definierten Abhängigkeitsregeln aus. Das beweist keine vollständige Unabhängigkeit; die Angaben erlauben lediglich keine konkrete Aussage dazu.',
 consequence:'Bestätigt sich eine Lücke bei „{weak}“, kann sie über das unmittelbare Thema hinaus wirken. Eine mögliche Folge muss anhand eines tatsächlichen Entscheidungswegs belegt werden, nicht allein aus einer Ampelfarbe.',
 evidence:'Die nächste Überprüfung betrifft „{priority}“ ({priorityRef}), eines der bereits nach dem bestehenden Modell ausgewählten Themen. Benennen Sie ein Dokument, eine Entscheidung oder ein Beispiel zur Klärung sowie eine berechtigte Person. Die zeitliche Umsetzung gehört in den folgenden Maßnahmenplan.'
 }
};
const deeper={
  "en": {
    "balanced": "The breadth of favourable answers may be an asset during ordinary decisions, yet the six scores do not establish that responsibility is widely shared. A respondent may know the arrangements well while others remain dependent upon explanation or permission. The next interpretive question concerns the relationship between personal understanding, documented authority and the capability of those expected to participate in future decisions.",
    "low": "The number of weaker answers makes it important to identify common causes before treating the six dimensions as separate problems. Limited access to documents, concentration of authority or insufficient practical experience could affect several areas at once. Those possibilities should be examined against the specific responses rather than presumed, since resolving a common underlying issue may improve more than one reported weakness.",
    "uneven": "The difference between the stronger and weaker parts of the profile raises a question about the practical boundaries of present readiness. A respondent may be able to understand one responsibility while lacking the authority, experience or supporting process necessary to act on it. The reported scores cannot confirm that this is happening, but they identify where an apparently positive assessment may depend upon an adjacent capability.",
    "developing": "A developing profile should be read as a sequence of capabilities still taking shape. The respondent may possess enough understanding to participate in some decisions while needing support for others. The useful interpretation therefore concerns the next credible step in responsibility, rather than an assumption that every developing dimension requires the same amount or type of intervention.",
    "partial": "An incomplete profile often reveals more about the respondent’s field of visibility than about the underlying arrangements themselves. The unanswered areas may belong to another role, be genuinely irrelevant, or depend on records the respondent has not seen. Clarifying that boundary can itself improve governance and preparation by making explicit who holds relevant knowledge and who is entitled to act.",
    "level": "Where the results cluster in a narrow range, the similarities deserve closer examination than an artificial league table. Two equally scored dimensions may represent very different kinds of preparation, such as knowledge of an arrangement and experience using it. Their comparable ratings therefore offer a starting question about how each capability operates rather than evidence that they are interchangeable."
  },
  "cs": {
    "balanced": "Široké spektrum příznivých odpovědí může napomáhat běžnému rozhodování, ale šest výsledků samo neprokazuje, že odpovědnost je skutečně sdílena. Respondent může uspořádání dobře znát, zatímco ostatní závisejí na vysvětlení či souhlasu. Další otázkou je vztah mezi osobním porozuměním, zdokumentovanou pravomocí a schopností osob, které se budou podílet na budoucích rozhodnutích.",
    "low": "Větší počet slabších odpovědí vyžaduje hledání společných příčin dříve, než se jednotlivé oblasti začnou řešit odděleně. Omezený přístup k dokumentům, soustředění pravomocí či nedostatek zkušeností mohou ovlivnit více oblastí současně. Tyto možnosti je však nutné ověřit podle konkrétních odpovědí, protože vyjasnění společného problému může pomoci na několika místech.",
    "uneven": "Rozdíl mezi silnějšími a slabšími částmi profilu vyvolává otázku skutečných hranic připravenosti. Respondent může určité odpovědnosti rozumět, ale nemusí mít pravomoc, zkušenost nebo potřebný postup k samostatnému jednání. Odpovědi takový stav nepotvrzují; ukazují však, kde by příznivé hodnocení mohlo záviset na sousední schopnosti.",
    "developing": "Rozvíjející se profil představuje postupné získávání schopností. Respondent může mít dostatečné porozumění pro účast na některých rozhodnutích, zatímco v jiných potřebuje podporu. Důležitá je proto další přiměřená fáze přebírání odpovědnosti, nikoli předpoklad, že všechny rozvíjející se oblasti vyžadují stejný zásah.",
    "partial": "Neúplný profil často vypovídá více o rozsahu respondentových informací než o samotném uspořádání. Nezodpovězené otázky mohou spadat do jiné role, být skutečně nerelevantní nebo záviset na nepřístupných záznamech. Vyjasnění těchto hranic může zlepšit správu i přípravu tím, že určí držitele informací a oprávnění k jednání.",
    "level": "U vyrovnaného souboru výsledků stojí za pozornost podobnosti, nikoli umělé pořadí. Dvě stejně hodnocené oblasti mohou představovat odlišné formy připravenosti, například znalost pravidla a zkušenost s jeho používáním. Srovnatelné hodnocení proto otevírá otázku skutečného fungování, nikoli jejich zaměnitelnosti."
  },
  "de": {
    "balanced": "Eine breite Grundlage günstiger Antworten kann Entscheidungen im Alltag unterstützen. Die sechs Werte bestätigen jedoch nicht, dass Verantwortung tatsächlich verteilt ist. Die befragte Person kennt die Regelungen möglicherweise gut, während andere auf Erklärung oder Zustimmung angewiesen sind. Entscheidend ist daher das Verhältnis zwischen persönlichem Verständnis, dokumentierter Befugnis und der Handlungsfähigkeit derjenigen, die künftig an Entscheidungen beteiligt sein sollen.",
    "low": "Bei zahlreichen schwächeren Antworten sollten mögliche gemeinsame Ursachen geprüft werden, bevor die sechs Bereiche getrennt behandelt werden. Eingeschränkter Dokumentenzugang, konzentrierte Befugnisse oder geringe praktische Erfahrung könnten mehrere Themen zugleich betreffen. Diese Möglichkeiten müssen anhand der konkreten Antworten bestätigt werden; die Klärung einer gemeinsamen Ursache kann mehr bewirken als isolierte Einzelmaßnahmen.",
    "uneven": "Der Abstand zwischen stärker und schwächer bewerteten Bereichen wirft Fragen nach den tatsächlichen Grenzen der Vorbereitung auf. Eine Person kann eine Verantwortung verstehen, ohne bereits über die Befugnis, Erfahrung oder unterstützenden Verfahren für selbstständiges Handeln zu verfügen. Das Profil beweist dies nicht, zeigt jedoch, wo eine günstige Einschätzung von einer benachbarten Fähigkeit abhängen könnte.",
    "developing": "Ein sich entwickelndes Profil beschreibt eine Folge noch wachsender Fähigkeiten. Die befragte Person kann bereits genug verstehen, um an manchen Entscheidungen mitzuwirken, und in anderen weiterhin Unterstützung benötigen. Die entscheidende Interpretation betrifft daher den nächsten angemessenen Schritt der Verantwortung und weniger eine gleichartige Maßnahme für sämtliche Bereiche.",
    "partial": "Ein unvollständiges Profil sagt häufig mehr über den Einblick der befragten Person aus als über die zugrunde liegenden Regelungen. Unbeantwortete Fragen können zu anderen Rollen gehören, tatsächlich nicht anwendbar sein oder von unbekannten Unterlagen abhängen. Eine Klärung dieser Grenzen kann Governance und Vorbereitung verbessern, weil Informationszugang und Handlungsbefugnis ausdrücklich geregelt werden.",
    "level": "Bei eng beieinanderliegenden Ergebnissen verdienen Gemeinsamkeiten mehr Aufmerksamkeit als eine künstliche Rangliste. Zwei gleich bewertete Bereiche können unterschiedliche Formen der Vorbereitung abbilden, etwa Wissen über eine Regelung und Erfahrung in ihrer Anwendung. Vergleichbare Werte laden deshalb zur Prüfung der tatsächlichen Praxis ein, statt Austauschbarkeit vorauszusetzen."
  }
};
const fill=(s,v)=>s.replace(/\{(\w+)\}/g,(_,k)=>String(v[k]??''));
const kind=v=>{
 let s=String(v?.status||'').toLowerCase();
 if(['established','green','strong'].includes(s)||v?.level===3)return 'established';
 if(['developing','amber'].includes(s)||v?.level===2)return 'developing';
 if(['exposed','red','weak'].includes(s)||v?.level===1)return 'exposed';
 return 'unscored';
};
const lbl=x=>String(x?.name||x?.title||x?.label||'').trim();
const tr=x=>String(x?.trace||x?.evidenceTrace||(Array.isArray(x?.questions)?x.questions.join(', '):'')).trim();
const usable=x=>kind(x)!=='unscored'&&Number.isFinite(x?.mean);
const suffix=(key,locale)=>({
 en:{established:'established',developing:'developing',exposed:'exposed'},
 cs:{established:'zakotvená',developing:'rozvíjející se',exposed:'zranitelná'},
 de:{established:'gefestigt',developing:'im Aufbau',exposed:'prüfungsbedürftig'}
}[locale]||{})[key]||({en:'unscored',cs:'nehodnocená',de:'unbewertet'}[locale]);
/** Explicit dependencies only: observed higher-vs-lower qualifying pairs. */
function confirmedContrast(review,pairs){
 for(const [a,b] of relation[review]||[]){
  const left=pairs.slice(a*4,a*4+4).filter(x=>usable(x)&&kind(x)==='established'&&tr(x));
  const right=pairs.slice(b*4,b*4+4).filter(x=>usable(x)&&['developing','exposed'].includes(kind(x))&&tr(x));
  if(left.length&&right.length){left.sort((x,y)=>y.mean-x.mean);right.sort((x,y)=>x.mean-y.mean);return [left[0],right[0]];}
 }
 return null;
}
export function editorialRead({review,language,counts,dimensions,pairs,priorities}){
 if(!relation[review]||!supported.includes(language)||dimensions?.length!==6||pairs?.length!==24||priorities?.length!==3)throw Error('invalid_editorial_input');
 const t=phrase[language],dims=dimensions.filter(usable).sort((a,b)=>b.mean-a.mean),available=pairs.filter(usable).sort((a,b)=>b.mean-a.mean);
 const high=dims[0],low=dims.at(-1),strong=available.find(x=>kind(x)==='established'),weak=[...available].reverse().find(x=>['exposed','developing'].includes(kind(x)));
 const secondStrong=available.find(x=>x!==strong&&kind(x)==='established'&&Math.floor((x.index??pairs.indexOf(x))/4)!==Math.floor((strong?.index??pairs.indexOf(strong))/4))||null;
 const scored=counts?.scored??0,unknown=counts?.unknown??0,na=counts?.na??0;
 const categories=dims.map(kind),established=categories.filter(x=>x==='established').length,exposed=categories.filter(x=>x==='exposed').length,developing=categories.filter(x=>x==='developing').length;
 const spread=high&&low?high.mean-low.mean:0;
 const variables={scored,unknown,na,n:established,high:lbl(high),low:lbl(low),highRef:tr(high),lowRef:tr(low),
 strong:lbl(strong),strongRef:tr(strong),second:lbl(secondStrong),secondRef:tr(secondStrong),weak:lbl(weak),weakRef:tr(weak),
 weakLevel:suffix(kind(weak),language),priority:lbl(priorities[0]),priorityRef:tr(priorities[0])};
 const visibility=scored<24||dims.length<4||available.length<6;
 let pattern=visibility?'partial':established>=5&&exposed===0&&developing<=1?'balanced':
 exposed>=4?'low':spread>=1.0?'uneven':developing>=3?'developing':'level';
 const dependency=!visibility?confirmedContrast(review,pairs):null;
 const def=dependency?{left:lbl(dependency[0]),leftRef:tr(dependency[0]),right:lbl(dependency[1]),rightRef:tr(dependency[1]),rightLevel:suffix(kind(dependency[1]),language)}:null;
 const evidence=tr(weak)||tr(strong)||tr(priorities[0])||'';
 return {
  version:EDITORIAL_VERSION,pattern,visibility,hasDependency:!!def,scored,locale:language,
  portraitPattern:fill(t[pattern],variables),
  domain:visibility?t.contextual:fill(domains[review][language],variables),
  portraitDeep:visibility?fill(t.uncertainty,variables):fill(t.focused,variables),
  portraitImplication:deeper[language][pattern],
  portraitPerspective:visibility?t.noEvidence:t.contextual,
  strength:strong?fill(t.strength,variables):t.noStrength,
  secondStrength:!visibility&&secondStrong?fill(t.secondStrength,variables):null,
  exposure:weak?fill(t.exposure,variables):t.noExposure,
  dependency:visibility?null:def?fill(t.dependency,def):t.noDependency,
  consequence:visibility?null:weak?fill(t.consequence,variables):null,
  uncertainty:!visibility&&(unknown+na)?fill(t.uncertainty,variables):null,
  evidence:fill(t.evidence,variables),
  trace:evidence
 };
}
