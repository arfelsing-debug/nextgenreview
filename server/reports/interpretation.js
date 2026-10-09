/**
 * Adamas evidence-led interpretation, version 1.1.0.
 * Pure, deterministic. Operates on the Review's EXISTING scored model.
 * Does not modify scores, priorities, original reports, or the Compass.
 */
export const interpretationVersion='1.1.0';
const names={
 family:{en:'Family Continuity',cs:'kontinuity rodiny',de:'Familienkontinuität'},
 adviser:{en:'Adviser Coordination',cs:'koordinace poradců',de:'Beraterkoordination'},
 shareholder:{en:'Shareholder Readiness',cs:'připravenosti akcionáře',de:'Vorbereitung als Anteilseigner'},
 nextgen:{en:'NextGen Readiness',cs:'připravenosti další generace',de:'Vorbereitung der nächsten Generation'}
};
const language={
 en:{
  portrait:'Your Individual Readiness Portrait',dependencies:'Strengths, Exposures and Dependencies',
  scenarios:'Readiness Through Change',action:'A Programme of Evidence-Led Action',continued:'Action and Review Record',
  finding:'Interpretation',verify:'Verification',trace:'Supporting answers',lead:'Responsible role and timetable',completion:'Completion evidence',
  opening:'This {review} portrait is based on {count} scored answers out of 48. Another {unknown} responses were marked unknown and {na} not applicable. It reflects one respondent’s perspective on arrangements and experience, rather than an independent audit or a population benchmark.',
  strong:'The clearest reported foundation concerns {name}. Its score suggests a useful starting position, subject to confirmation through a recent decision, document or practical example ({trace}). Maintaining this foundation through changes in people or circumstances deserves deliberate attention.',
  noStrong:'The available complete subdimension responses do not identify a firmly established foundation. This may indicate limited readiness, restricted visibility or a cautious assessment. Further examples are needed before making a positive or negative judgement.',
  weak:'The first area to examine is {name}, where the reported responses indicate {status} ({trace}). The respondent should establish what actually exists, who can confirm it and whether a practical exercise would support or change this assessment.',
  noWeak:'There is no fully scored area currently classified as exposed or developing. This is not proof of resilience; stronger areas still require meaningful practical testing.',
  noScored:'There are no sufficiently scored subdimensions from which to identify a weakness or a strength. The appropriate first task is to clarify information and relevance rather than draw conclusions.',
  cross:'The reported strength in {first} sits alongside a less developed arrangement in {second}. Even where both are functioning in ordinary circumstances, the second could limit the durability of the first. This relationship is a hypothesis to check, supported by {trace}.',
  nocross:'The scored responses do not provide a sufficiently pronounced contrast for a reliable cross-dimensional inference. Similar scores do not establish that arrangements work together; review an actual decision to test their consistency.',
  unknown:'Missing or not-applicable answers must remain unscored. Confirm the respondent’s access to information and the relevance of these matters before assigning remedial action.',
  normal:'Under normal conditions, ask who makes the relevant decisions, where the current arrangement is documented and which example demonstrates its operation.',
  change:'During a change of responsibility, ask which authority, relationship or information route could cease to work and who has power to maintain continuity.',
  pressure:'Under adverse circumstances, rehearse one realistic disagreement, absence or urgent decision. Document how the arrangements would work and which unanswered questions remain.',
  scenariosCaution:'These are scenarios for discussion, not assessments of the likelihood of future events. No separate stress score has been calculated.',
  priority:'Priority {num}: {name}. The existing Review model selected this topic for attention. The recommendation is to test and improve the reported arrangement, not to assume that a deficiency has been independently established.',
  follow:'Agree a responsible person and access permission within 30 days, complete a proportionate test within 90 days, and reconsider the findings during the annual review.',
  caveat:'All interpretations are conditional on the supplied answers. Independent records, affected stakeholders and suitably qualified advisers may change the conclusions. A single respondent cannot speak for an entire family or professional team.',
  evidence:'Check the relevant record or recent decision with an authorised person. Record agreement, uncertainty and any difference between reported understanding and actual practice.'
 },
 cs:{
  portrait:'Individuální obraz připravenosti',dependencies:'Silné stránky, zranitelnosti a závislosti',
  scenarios:'Připravenost při změnách',action:'Plán kroků podložených důkazy',continued:'Další kroky a záznam o přezkumu',
  finding:'Výklad',verify:'Ověření',trace:'Podpůrné odpovědi',lead:'Odpovědná osoba a termín',completion:'Doklad o splnění',
  opening:'Tento obraz {review} vychází z {count} číselně hodnocených odpovědí ze 48. Dalších {unknown} odpovědí je neznámých a {na} bylo označeno jako nerelevantní. Odráží pohled jednoho respondenta na uspořádání a zkušenosti, nikoli nezávislý audit či srovnání s populací.',
  strong:'Nejzřetelnější uváděný základ se týká oblasti {name}. Hodnocení naznačuje použitelnou výchozí pozici, kterou je třeba potvrdit nedávným rozhodnutím, dokumentem nebo praktickým příkladem ({trace}). Udržení tohoto základu při změně osob nebo okolností vyžaduje pozornost.',
  noStrong:'Úplně hodnocené dílčí oblasti zatím neukazují jednoznačně zakotvený základ. Může jít o omezenou připravenost, nedostatečné informace nebo opatrné hodnocení. Před kladným či záporným závěrem je třeba ověřit další příklady.',
  weak:'Nejprve doporučujeme prozkoumat oblast {name}, v níž odpovědi naznačují stav {status} ({trace}). Respondent by měl zjistit, co skutečně existuje, kdo to může potvrdit a zda praktická zkouška hodnocení podpoří nebo změní.',
  noWeak:'Žádná úplně hodnocená oblast není nyní označena jako zranitelná či rozvíjející se. To samo o sobě odolnost nepotvrzuje; i silné oblasti vyžadují smysluplnou praktickou zkoušku.',
  noScored:'Nejsou k dispozici dostatečně hodnocené dílčí oblasti, z nichž by bylo možné vyvodit slabou nebo silnou stránku. Nejprve je třeba objasnit informace a relevantnost, nikoli činit závěry.',
  cross:'Uváděná silná stránka v oblasti {first} se pojí s méně rozvinutým uspořádáním v oblasti {second}. I když obě fungují za běžných okolností, druhá může omezovat trvalost první. Tuto hypotézu je vhodné ověřit podle odpovědí {trace}.',
  nocross:'Hodnocené odpovědi neukazují natolik výrazný rozdíl, aby bylo možné spolehlivě vyvozovat vazbu mezi oblastmi. Podobné výsledky neprokazují společné fungování; ověřte je na skutečném rozhodnutí.',
  unknown:'Neznámé a nerelevantní odpovědi zůstávají bez hodnocení. Před přidělením nápravného kroku ověřte přístup respondenta k informacím a relevantnost věci.',
  normal:'Za běžných okolností ověřte, kdo rozhoduje, kde je příslušné uspořádání zaznamenáno a který příklad dokládá jeho fungování.',
  change:'Při změně odpovědnosti určete, které pravomoci, vztahy nebo informační cesty by mohly přestat fungovat a kdo je oprávněn zachovat kontinuitu.',
  pressure:'Při náročných okolnostech si vyzkoušejte reálný nesouhlas, nepřítomnost či naléhavé rozhodnutí. Zaznamenejte postup a zbývající otevřené otázky.',
  scenariosCaution:'Jde o scénáře k diskusi, nikoli o odhad pravděpodobnosti budoucích událostí. Nebylo vypočítáno samostatné zátěžové skóre.',
  priority:'Priorita {num}: {name}. Toto téma vybral stávající model Review. Doporučení směřuje k ověření a zlepšení uváděného uspořádání, nikoli k předpokladu nezávisle prokázaného nedostatku.',
  follow:'Do 30 dnů dohodněte odpovědnou osobu a oprávnění k přístupu, do 90 dnů proveďte přiměřenou zkoušku a během ročního přezkumu zjištění znovu posuďte.',
  caveat:'Všechny interpretace závisejí na poskytnutých odpovědích. Nezávislé dokumenty, další účastníci a příslušní odborní poradci mohou závěry změnit. Jeden respondent nemůže mluvit za celou rodinu nebo profesní tým.',
  evidence:'Ověřte příslušný dokument nebo nedávné rozhodnutí s oprávněnou osobou. Zaznamenejte shodu, nejistotu i rozdíly mezi představou respondenta a praxí.'
 },
 de:{
  portrait:'Ihr individuelles Bild der Vorbereitung',dependencies:'Stärken, Schwachstellen und Abhängigkeiten',
  scenarios:'Vorbereitung auf Veränderungen',action:'Maßnahmenplan mit Nachweisen',continued:'Weitere Maßnahmen und Überprüfung',
  finding:'Einordnung',verify:'Prüfung',trace:'Zugrunde liegende Antworten',lead:'Verantwortliche Person und Zeitplan',completion:'Abschlussnachweis',
  opening:'Dieses Bild zur {review} beruht auf {count} numerisch bewerteten Antworten von 48. Weitere {unknown} Antworten sind unbekannt und {na} nicht anwendbar. Es gibt die Sicht einer befragten Person auf Regelungen und Erfahrungen wieder, nicht eine unabhängige Prüfung oder einen Bevölkerungsvergleich.',
  strong:'Die deutlichste berichtete Grundlage betrifft {name}. Das Ergebnis legt einen brauchbaren Ausgangspunkt nahe, der durch eine jüngere Entscheidung, ein Dokument oder ein praktisches Beispiel zu bestätigen ist ({trace}). Diese Grundlage auch bei veränderten Personen und Umständen zu erhalten, bedarf bewusster Aufmerksamkeit.',
  noStrong:'Unter den vollständig bewerteten Teilbereichen zeigt sich noch keine eindeutig etablierte Grundlage. Dies kann auf begrenzte Vorbereitung, eingeschränkte Sichtbarkeit oder eine vorsichtige Beurteilung zurückgehen. Vor einer positiven oder negativen Schlussfolgerung sind weitere Beispiele nötig.',
  weak:'Zunächst sollte der Bereich {name} untersucht werden; die Antworten deuten auf {status} hin ({trace}). Klären Sie, welche Regelungen tatsächlich bestehen, wer diese bestätigen kann und ob eine praktische Prüfung die Einschätzung stützt oder verändert.',
  noWeak:'Kein vollständig bewerteter Bereich wurde als anfällig oder im Aufbau eingestuft. Dies belegt allein noch keine Belastbarkeit; auch starke Bereiche sollten praktisch geprüft werden.',
  noScored:'Es liegen keine hinreichend bewerteten Teilbereiche vor, aus denen sich Stärken oder Schwächen ableiten lassen. Zunächst müssen Informationen und Anwendbarkeit geklärt werden.',
  cross:'Die berichtete Stärke bei {first} steht einer weniger entwickelten Regelung bei {second} gegenüber. Selbst wenn beide im Alltag funktionieren, könnte der zweite Bereich die Dauerhaftigkeit des ersten einschränken. Diese Hypothese lässt sich anhand der Antworten {trace} prüfen.',
  nocross:'Die bewerteten Antworten zeigen keinen hinreichend ausgeprägten Unterschied für einen belastbaren Schluss zwischen den Bereichen. Ähnliche Werte belegen kein Zusammenwirken; prüfen Sie dies an einer tatsächlichen Entscheidung.',
  unknown:'Unbekannte und nicht anwendbare Antworten bleiben unbewertet. Klären Sie zunächst den Informationszugang und die Anwendbarkeit, bevor Sie Maßnahmen zuweisen.',
  normal:'Unter normalen Bedingungen prüfen Sie, wer entscheidet, wo die Regelung dokumentiert ist und welches jüngere Beispiel ihre Wirksamkeit zeigt.',
  change:'Bei einem Verantwortungswechsel klären Sie, welche Befugnis, Beziehung oder Informationsquelle entfallen könnte und wer die Kontinuität sichern darf.',
  pressure:'In einer belastenden Situation spielen Sie einen realistischen Konflikt, Ausfall oder eine dringende Entscheidung durch. Dokumentieren Sie den Ablauf und offene Fragen.',
  scenariosCaution:'Dies sind Gesprächsszenarien, keine Prognosen künftiger Ereignisse. Ein eigenständiger Belastungswert wurde nicht berechnet.',
  priority:'Priorität {num}: {name}. Das bestehende Review-Modell hat dieses Thema ausgewählt. Die Empfehlung dient der Prüfung und Verbesserung der berichteten Regelung, nicht der Unterstellung eines unabhängig bestätigten Mangels.',
  follow:'Vereinbaren Sie binnen 30 Tagen eine verantwortliche Person und die nötige Berechtigung, führen Sie binnen 90 Tagen eine angemessene Prüfung durch und überprüfen Sie die Befunde innerhalb eines Jahres.',
  caveat:'Sämtliche Einordnungen beruhen auf den Antworten. Unabhängige Unterlagen, weitere Beteiligte und geeignete Fachberater können zu anderen Ergebnissen gelangen. Eine einzelne Person spricht nicht für eine ganze Familie oder ein Beratungsteam.',
  evidence:'Prüfen Sie ein relevantes Dokument oder eine jüngere Entscheidung mit einer berechtigten Person. Halten Sie Übereinstimmungen, Unklarheiten und Abweichungen zwischen Verständnis und gelebter Praxis fest.'
 }
};
const localStatus={
 en:{exposed:'an exposure',developing:'developing preparedness'},
 cs:{exposed:'zranitelnosti',developing:'postupného rozvoje'},
 de:{exposed:'eine mögliche Schwachstelle',developing:'einen Entwicklungsbedarf'}
};
const context={
 family:{
  en:['Current family decision-making','Succession or unexpected absence','Conflict or disrupted access'],
  cs:['Současné rodinné rozhodování','Nástupnictví či nečekaná nepřítomnost','Neshoda či omezený přístup'],
  de:['Aktuelle Familienentscheidungen','Nachfolge oder unerwarteter Ausfall','Konflikt oder unterbrochener Zugang']
 },
 adviser:{
  en:['Coordinating an ordinary advice matter','Change of a principal adviser','Urgent decision across several advisers'],
  cs:['Koordinace běžné poradenské záležitosti','Změna hlavního poradce','Naléhavé rozhodnutí více poradců'],
  de:['Koordination eines regulären Beratungsfalls','Wechsel eines Hauptberaters','Dringende Entscheidung mehrerer Berater']
 },
 shareholder:{
  en:['Ordinary shareholder information and voting','Transfer of shares or succession','Urgent vote or disagreement'],
  cs:['Běžné informace a hlasování akcionáře','Převod podílu či nástupnictví','Naléhavé hlasování či spor'],
  de:['Reguläre Informationen und Abstimmungen','Anteilsübertragung oder Nachfolge','Dringende Abstimmung oder Konflikt']
 },
 nextgen:{
  en:['Present learning and participation','Assuming a new ownership or governance role','Unexpected responsibility or family disruption'],
  cs:['Současné vzdělávání a zapojení','Převzetí vlastnické či řídicí role','Nečekaná odpovědnost či narušení rodinných poměrů'],
  de:['Aktuelles Lernen und Mitwirken','Übernahme einer Eigentümer- oder Führungsrolle','Unerwartete Verantwortung oder familiäre Krise']
 }
};
const f=(s,o)=>s.replace(/\{(\w+)\}/g,(_,k)=>String(o[k]??''));
const colour=x=> {
 const s=String(x?.status||'').toLowerCase();
 if(['green','established','strong'].includes(s)||x?.level===3)return 'established';
 if(['amber','developing'].includes(s)||x?.level===2)return 'developing';
 if(['red','exposed','weak'].includes(s)||x?.level===1)return 'exposed';
 return 'unscored';
};
const reference=x=>String(x?.trace||x?.evidenceTrace||x?.questions?.join(', ')||'').trim();
const labelled=x=>String(x?.name||x?.label||x?.title||'').trim();
const valid=x=>colour(x)!=='unscored';
const fields=(...x)=>x.filter(Boolean).join('; ');
/**
 * @param {{review:'family'|'adviser'|'shareholder'|'nextgen',language:string,counts:{scored:number,unknown:number,na:number},dimensions:Array,pairs:Array,priorities:Array}} input
 * @returns {{version:string,pages:Array,priorityIds:Array}}
 */
export function interpretReadiness(input){
 const {review,language:lang,counts,dimensions,pairs,priorities}=input||{};
 const c=language[lang];
 if(!c||!names[review]||!Array.isArray(dimensions)||dimensions.length!==6||!Array.isArray(pairs)||pairs.length!==24||!Array.isArray(priorities)||priorities.length!==3)throw Error('invalid_interpretation_input');
 if(!counts||!Number.isInteger(counts.scored)||!Number.isInteger(counts.unknown)||!Number.isInteger(counts.na)||counts.scored+counts.unknown+counts.na!==48)throw Error('invalid_interpretation_coverage');
 const scored=pairs.filter(valid),best=[...scored].filter(x=>colour(x)==='established').sort((a,b)=>(b.mean??0)-(a.mean??0))[0];
 const needing=[...scored].filter(x=>['exposed','developing'].includes(colour(x))).sort((a,b)=>((colour(a)==='exposed'?0:1)-(colour(b)==='exposed'?0:1))||(a.mean??0)-(b.mean??0))[0];
 const strongest=dimensions.filter(valid).sort((a,b)=>(b.mean??0)-(a.mean??0))[0];
 const weakest=dimensions.filter(valid).sort((a,b)=>(a.mean??0)-(b.mean??0))[0];
 // Only pre-defined domain dependencies may generate cross-dimensional hypotheses.
 const allowedDependencies={
  family:[[2,3],[1,2],[4,5],[0,3]],
  adviser:[[0,1],[2,3],[4,5]],
  shareholder:[[0,1],[1,3],[2,3],[4,5]],
  nextgen:[[1,2],[2,3],[3,4],[4,5]]
 };
 let contrast=null;
 for(const [i,j] of allowedDependencies[review]){
  const left=pairs.slice(i*4,i*4+4).filter(q=>colour(q)==='established'&&reference(q));
  const right=pairs.slice(j*4,j*4+4).filter(q=>['developing','exposed'].includes(colour(q))&&reference(q));
  if(left.length&&right.length){
   left.sort((a,b)=>(b.mean??0)-(a.mean??0));right.sort((a,b)=>(a.mean??0)-(b.mean??0));
   contrast=[left[0],right[0]];break;
  }
 }
 const pairRefs=fields(...priorities.map(reference));
 const para=text=>({type:'paragraph',text}),head=text=>({type:'heading',text}),field=(label,text)=>({type:'field',label,text:String(text||'')});
 const page=(title,items)=>({title,items,interpretive:true});
 const a=[
  para(f(c.opening,{review:names[review][lang],count:counts.scored,unknown:counts.unknown,na:counts.na})),
  para(best?f(c.strong,{name:labelled(best),trace:reference(best)}):c.noStrong),
  para(needing?f(c.weak,{name:labelled(needing),status:localStatus[lang][colour(needing)],trace:reference(needing)}):scored.length?c.noWeak:c.noScored),
  para(c.caveat)
 ];
 const b=[
  head(c.dependencies),
  para(contrast?f(c.cross,{first:labelled(contrast[0]),second:labelled(contrast[1]),trace:fields(reference(contrast[0]),reference(contrast[1]))}):c.nocross),
  field(c.trace,contrast?fields(reference(contrast[0]),reference(contrast[1])):pairRefs),
  field(c.verify,c.evidence),
  para(counts.unknown+counts.na?c.unknown:c.evidence)
 ];
 const scenarioNames=context[review][lang];
 const cond=[c.normal,c.change,c.pressure],refs=[
  fields(reference(dimensions[0]),reference(dimensions[1])),
  fields(reference(dimensions[4]),reference(dimensions[5])),
  fields(reference(dimensions[2]),reference(dimensions[3]))
 ];
 const d=cond.flatMap((s,i)=>[head(scenarioNames[i]),para(s),field(c.trace,refs[i]||pairRefs)]);
 d.push(para(c.scenariosCaution));
 const actionItems=r=>[head(labelled(r)),para(f(c.priority,{num:priorities.indexOf(r)+1,name:labelled(r)})),field(c.verify,r.action||r.firstAction||c.evidence),field(c.completion,r.progress||r.completionEvidence||r.responseProgress||c.evidence),field(c.trace,reference(r)),field(c.lead,c.follow)];
 const out=[
  page(c.portrait,a),
  page(c.dependencies,b),
  page(c.scenarios,d),
  page(c.action,priorities.slice(0,2).flatMap(actionItems)),
  page(c.continued,[...actionItems(priorities[2]),para(c.caveat)])
 ];
 return {version:interpretationVersion,review,language:lang,counts,
  priorityIds:priorities.map((x,i)=>x.id??x.index??(reference(x)||String(i))),pages:out};
}
