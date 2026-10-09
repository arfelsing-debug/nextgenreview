/** Evidence-grounded strengths and exposures analysis. No scoring or risk forecasting. */
export const EXPOSURES_VERSION='2.0.0';
const text={
 en:{
  second:'Exposures, Dependencies and Their Consequences',
  strengthIntro:'The useful question is how each reported strength is sustained. {first} ({firstRef}) is among the more favourable complete responses. That may reflect a functioning arrangement, relevant experience or a well-understood responsibility. Confirm the practical basis of the score before relying on it: identify one recent decision, the responsible people and the record that shows how it was reached. A reported strength should continue to work when the person most familiar with it is unavailable.',
  strengthSecond:'The assessment of {second} ({secondRef}) offers another perspective. Consider whether the two areas reinforce one another or depend upon the same people, information or authority. If both are consistently supported, that combination may offer a useful foundation for the next stage of preparation. If one depends on informal knowledge, the apparent breadth of capability may be less resilient than the overall profile suggests.',
  strengthNotProven:'Some areas are reported favourably, but the Review cannot independently certify effectiveness. Ask an authorised person to confirm the relevant arrangement and, where appropriate, run a small practical test. A high response is a reason to look for evidence, not a substitute for it.',
  noStrength:'No complete scored area presently qualifies as an established strength. This is a limit of what the respondent can confirm, rather than proof of incapacity or failed governance. Begin with clarification and a recent example of a decision or responsibility already handled in practice.',
  compare:'The contrast between {strong} and {weak} warrants investigation. The first is reported more favourably; the second is {weakStatus}. The practical question is whether a capability apparently present in the first area depends upon procedures or judgement covered by the second. The answers ({refs}) permit this question to be raised, but they do not establish that a breakdown has occurred.',
  comparisonFallback:'The available responses do not justify presenting any one dependency as established. This does not imply that arrangements are aligned. Compare two completed decisions or exercises, including the people involved, information available and authority used, to identify where independent confirmation is needed.',
  resilience:'A durable strength is one that can be explained, demonstrated and repeated by an appropriately authorised person. Test the reported foundation through a documented handover or supervised exercise. Record the capability demonstrated, the assistance required and the safeguard on which success depended. This exercise may show that a less visible part of the system deserves more attention than the headline score suggests.',
  exposuresIntro:'The more immediate exposure requiring examination is {weak} ({weakRef}). The responses indicate {weakStatus}. That assessment should be treated as an invitation to test the position, not a final judgement about the people or structures involved. Determine what is currently documented, what remains uncertain and which decisions could be affected if no improvement were made.',
  noExposure:'The completed responses do not identify a clearly exposed or developing area. The appropriate conclusion is narrower than universal readiness: the reported arrangements deserve to be tested under different conditions, and unknown responses require clarification before reliance is placed on them.',
  consequence:'An issue in {weak} may matter beyond its own dimension. {domain} Consider which other arrangements could depend upon the same individual, document or decision route. A consequence should only be recorded when a realistic pathway can be described and supported by a practical example; do not turn a possible dependency into a prediction of failure.',
  uncertainty:'There are {unknown} unknown and {na} not-applicable answers. Neither category should be scored as weakness. Identify who can confirm the relevant facts, whether the respondent has appropriate access and whether the question is genuinely outside their role. The findings should be amended if better information materially changes the picture.',
  stress:'The next check is to place the most significant potential exposure within a plausible change of circumstances. {scenario} Agree beforehand how the exercise would demonstrate successful performance and whose authorisation is needed. A controlled test may reveal a manageable uncertainty, a genuine procedural gap or an effective arrangement that the respondent simply did not know existed.',
  action:'The priority for action is {priority} ({priorityRef}), already selected by the existing scoring rules. Ask an authorised lead to agree a bounded verification within thirty days, complete an evidence-based exercise within ninety days and reconsider the result within a year. Record the owner, completion evidence and any obstruction. Preserve the strengths that pass their tests while avoiding premature changes to arrangements that have not yet been properly understood.'
 },
 cs:{
  second:'Zranitelnosti, závislosti a jejich důsledky',
  strengthIntro:'U každé uváděné silné stránky je důležité pochopit, na čem skutečně stojí. Oblast {first} ({firstRef}) patří mezi příznivěji hodnocené úplné odpovědi. Může to odrážet fungující uspořádání, zkušenosti nebo dobře pochopenou odpovědnost. Před spoléháním na toto hodnocení ověřte jeden nedávný případ, odpovědné osoby a písemný záznam rozhodnutí. Udržitelná silná stránka by měla fungovat i při nepřítomnosti člověka, který ji nejlépe zná.',
  strengthSecond:'Další perspektivu nabízí oblast {second} ({secondRef}). Prověřte, zda se obě oblasti podporují nebo závisí na stejných osobách, informacích či pravomocích. Pokud jsou obě dlouhodobě doloženy, mohou vytvářet dobrý základ pro další rozvoj. Pokud jedna závisí na neformálních znalostech, může být skutečná odolnost menší, než naznačuje celkový profil.',
  strengthNotProven:'Příznivé odpovědi představují důležitý základ pro diskusi, avšak Review sám nezávisle nepotvrzuje účinnost. Požádejte oprávněnou osobu o ověření příslušných postupů a případně proveďte omezenou praktickou zkoušku. Vysoké hodnocení je důvodem hledat důkazy, nikoli jejich náhradou.',
  noStrength:'Žádná úplně hodnocená oblast nyní nesplňuje podmínky pro jednoznačně zakotvenou silnou stránku. Jde o omezení dostupných informací, nikoli o důkaz neschopnosti nebo selhání správy. Začněte ověřením nedávného rozhodnutí či odpovědnosti, které se již v praxi uskutečnily.',
  compare:'Rozdíl mezi oblastmi {strong} a {weak} si zaslouží prověření. První byla hodnocena příznivěji, zatímco druhá je {weakStatus}. Je třeba zjistit, zda schopnost prokázaná v první oblasti nezávisí na postupech či úsudku, které spadají do oblasti druhé. Odpovědi ({refs}) umožňují takovou otázku položit, samy však neprokazují selhání.',
  comparisonFallback:'Dostupné odpovědi neodůvodňují závěr o prokázané závislosti. To ovšem neznamená, že je celé uspořádání sladěné. Porovnejte dvě dokončená rozhodnutí či cvičení, účastníky, dostupné informace a využité pravomoci a určete, co vyžaduje nezávislé potvrzení.',
  resilience:'Udržitelnou silnou stránku lze vysvětlit, prokázat a opakovat prostřednictvím oprávněné osoby. Vyzkoušejte ji při dokumentovaném předání nebo pod dohledem. Zaznamenejte prokázanou schopnost, potřebnou pomoc a opatření, na němž úspěch závisel. Může se ukázat, že méně viditelná část systému vyžaduje větší pozornost než samotné skóre.',
  exposuresIntro:'První zranitelností k prověření je oblast {weak} ({weakRef}). Odpovědi naznačují stav {weakStatus}. Je třeba ji vnímat jako podnět k ověření, nikoli jako konečný soud o zapojených osobách nebo strukturách. Zjistěte, co je již zdokumentováno, co zůstává nejisté a která rozhodnutí by mohla být dotčena.',
  noExposure:'Úplné odpovědi neukazují zjevně zranitelnou ani rozvíjející se oblast. Takový výsledek ještě nedokazuje celkovou připravenost. Uspořádání je třeba prověřit v odlišných podmínkách a před spoléháním na ně vyjasnit neznámé odpovědi.',
  consequence:'Problém v oblasti {weak} může mít dopad i mimo tuto oblast. {domain} Zvažte, které další postupy závisejí na stejné osobě, dokumentu nebo rozhodovací cestě. Důsledek zaznamenejte až poté, co lze popsat realistický průběh a doložit jej praktickým příkladem; možnost selhání není předpovědí.',
  uncertainty:'Počet neznámých odpovědí je {unknown} a nerelevantních {na}. Žádná z těchto kategorií není slabým skóre. Zjistěte, kdo může potvrdit skutečnosti, zda má respondent oprávněný přístup a zda otázka do jeho role skutečně nepatří. Nové podklady mohou změnit závěry.',
  stress:'Nejvýznamnější možnou zranitelnost je vhodné prověřit při realistické změně okolností. {scenario} Předem určete, co bude dokladem úspěchu a kdo musí cvičení schválit. Omezená zkouška může odhalit zvládnutelnou nejistotu, skutečnou procesní mezeru nebo účinné opatření, o kterém respondent pouze nevěděl.',
  action:'První prioritou je {priority} ({priorityRef}), kterou vybrala stávající pravidla hodnocení. Do třiceti dnů by měla oprávněná osoba dohodnout omezenou prověrku, do devadesáti dnů provést praktický test a během roku výsledek znovu posoudit. Zaznamenejte odpovědnou osobu, doklad splnění a případnou překážku. Zachovejte doložené silné stránky a neprovádějte předčasné změny bez ověření skutečného stavu.'
 },
 de:{
  second:'Schwachstellen, Abhängigkeiten und ihre Folgen',
  strengthIntro:'Bei jeder berichteten Stärke muss zunächst geklärt werden, worauf sie beruht. {first} ({firstRef}) gehört zu den günstiger bewerteten vollständig beantworteten Bereichen. Dies kann eine funktionierende Regelung, praktische Erfahrung oder klar verstandene Verantwortung widerspiegeln. Prüfen Sie eine jüngere Entscheidung, die beteiligten Personen und deren Dokumentation, bevor Sie sich auf das Ergebnis verlassen. Eine tragfähige Stärke sollte auch ohne die Person funktionieren, die den Ablauf am besten kennt.',
  strengthSecond:'Eine weitere Perspektive bietet {second} ({secondRef}). Untersuchen Sie, ob sich beide Bereiche ergänzen oder von denselben Personen, Informationen und Befugnissen abhängen. Sind beide nachhaltig belegt, können sie die nächste Entwicklungsphase stützen. Beruht einer dagegen auf informellem Wissen, kann die tatsächliche Belastbarkeit geringer sein, als das Gesamtbild vermuten lässt.',
  strengthNotProven:'Günstige Selbstauskünfte bilden eine hilfreiche Gesprächsgrundlage, doch der Review bestätigt ihre Wirksamkeit nicht unabhängig. Lassen Sie die Regelungen von einer berechtigten Person prüfen und führen Sie gegebenenfalls einen kleinen Praxistest durch. Ein hoher Wert begründet die Suche nach Belegen; er ersetzt diese nicht.',
  noStrength:'Kein vollständig bewerteter Bereich gilt gegenwärtig eindeutig als gefestigte Stärke. Dies zeigt eine Grenze des vorhandenen Wissens und beweist weder mangelnde Fähigkeit noch schlechte Governance. Beginnen Sie mit einer jüngeren Entscheidung oder Aufgabe, die bereits praktisch bewältigt wurde.',
  compare:'Der Unterschied zwischen {strong} und {weak} verdient eine nähere Prüfung. Der erste Bereich wird günstiger beurteilt, der zweite wird {weakStatus}. Prüfen Sie, ob die im ersten Bereich berichtete Fähigkeit von Verfahren oder Urteilskraft abhängt, die dem zweiten Bereich zuzuordnen sind. Die Antworten ({refs}) erlauben diese Frage, belegen aber keinen tatsächlichen Ausfall.',
  comparisonFallback:'Die Antworten erlauben keine gesicherte Aussage über eine konkrete Abhängigkeit. Daraus darf keine allgemeine Übereinstimmung abgeleitet werden. Vergleichen Sie zwei abgeschlossene Entscheidungen, einschließlich Teilnehmern, Informationszugang und Befugnissen, um noch nicht bestätigte Voraussetzungen zu erkennen.',
  resilience:'Eine dauerhafte Stärke lässt sich erklären, demonstrieren und durch eine berechtigte Person wiederholen. Testen Sie sie bei einer dokumentierten Übergabe oder unter Aufsicht. Halten Sie die gezeigte Fähigkeit, benötigte Unterstützung und die zugrunde liegende Schutzmaßnahme fest. Dabei kann sich zeigen, dass ein weniger sichtbarer Teil wichtiger ist als die Gesamtnote vermuten lässt.',
  exposuresIntro:'Zunächst verdient {weak} ({weakRef}) nähere Aufmerksamkeit. Die Antworten weisen auf {weakStatus} hin. Das ist eine zu prüfende Annahme und kein abschließendes Urteil über Personen oder Strukturen. Klären Sie, welche Regelungen dokumentiert sind, was unklar bleibt und welche Entscheidungen ohne Verbesserung betroffen sein könnten.',
  noExposure:'In den vollständig bewerteten Bereichen ist keine eindeutige Schwachstelle oder Entwicklungsaufgabe erkennbar. Dies bedeutet noch keine allgemeine Bereitschaft. Die gemeldeten Regelungen sollten unter veränderten Bedingungen getestet und fehlende Antworten vor einer Verwendung geklärt werden.',
  consequence:'Ein Problem bei {weak} kann über seinen eigenen Bereich hinausreichen. {domain} Prüfen Sie, welche weiteren Abläufe auf derselben Person, Unterlage oder Entscheidungsbefugnis beruhen. Beschreiben Sie eine Folge erst, wenn sich ein realistischer Ablauf durch ein Beispiel belegen lässt; eine mögliche Abhängigkeit ist keine Vorhersage eines Scheiterns.',
  uncertainty:'Es liegen {unknown} unbekannte und {na} nicht anwendbare Antworten vor. Beide Kategorien dürfen nicht als Schwäche bewertet werden. Klären Sie, wer die Tatsachen bestätigen kann, ob die befragte Person berechtigten Zugang hat und ob eine Frage tatsächlich außerhalb ihrer Rolle liegt. Bessere Informationen können die Beurteilung ändern.',
  stress:'Die wichtigste mögliche Schwachstelle sollte unter realistisch veränderten Umständen geprüft werden. {scenario} Vereinbaren Sie vorab Erfolgsnachweise und die notwendige Befugnis. Ein begrenzter Test kann eine beherrschbare Unsicherheit, eine echte Verfahrenslücke oder eine wirksame, bisher unbekannte Regelung aufdecken.',
  action:'Die erste Priorität ist {priority} ({priorityRef}), die von den bestehenden Bewertungsregeln bestimmt wurde. Vereinbaren Sie innerhalb von dreißig Tagen eine begrenzte Prüfung, führen Sie bis zum neunzigsten Tag einen belegten Praxistest durch und bewerten Sie die Ergebnisse innerhalb eines Jahres neu. Halten Sie die verantwortliche Person, den Nachweis und etwaige Hindernisse fest. Bewahren Sie bestätigte Stärken und vermeiden Sie Änderungen an noch ungeklärten Regelungen.'
 }
};
const specifics={
 family:{
  en:'Consider how family relationships, governance and successor authority connect when decisions must be taken collectively.',
  cs:'Zvažte, jak souvisejí rodinné vztahy, správa a pravomoci nástupců při společném rozhodování.',
  de:'Beachten Sie, wie Familienbeziehungen, Governance und Nachfolgebefugnisse bei gemeinsamen Entscheidungen zusammenwirken.'
 },
 nextgen:{
  en:'Consider whether knowledge is accompanied by actual opportunities to practise ownership judgement and responsibility.',
  cs:'Zvažte, zda znalosti doprovází skutečná příležitost k procvičování vlastnického úsudku a odpovědnosti.',
  de:'Prüfen Sie, ob dem Wissen auch tatsächliche Gelegenheiten folgen, Eigentümerurteil und Verantwortung zu üben.'
 },
 shareholder:{
  en:'Consider whether shareholder rights, financial understanding and the route for disputing decisions are equally well understood.',
  cs:'Zvažte, zda jsou stejně dobře pochopena práva vlastníků, finanční souvislosti a způsob řešení sporných rozhodnutí.',
  de:'Prüfen Sie, ob Gesellschafterrechte, finanzielles Verständnis und Verfahren bei strittigen Entscheidungen gleichermaßen verstanden werden.'
 },
 adviser:{
  en:'Consider whether the advisory mandate, conflicts, coordination and accountability remain clear when professionals disagree.',
  cs:'Zvažte, zda mandát poradců, střety zájmů, koordinace a odpovědnost zůstávají jasné při rozdílných odborných doporučeních.',
  de:'Prüfen Sie, ob Beratungsauftrag, Interessenkonflikte, Koordination und Rechenschaft auch bei unterschiedlichen Fachmeinungen klar bleiben.'
 },
 investment:{
  en:'Consider how investment mandate, reporting, portfolio risk and authority interact during rapid market changes.',
  cs:'Zvažte, jak při prudkých změnách trhu souvisejí investiční mandát, reporting, riziko portfolia a pravomoci.',
  de:'Prüfen Sie, wie Anlagemandat, Berichterstattung, Portfoliorisiko und Befugnisse bei schnellen Marktveränderungen zusammenwirken.'
 }
};
const scenarios={
 family:{en:'Rehearse an unexpected absence during a succession decision; include document access and required consents.',cs:'Nacvičte nepřítomnost důležité osoby při rozhodnutí o nástupnictví, včetně přístupu k dokumentům a souhlasů.',de:'Erproben Sie den unerwarteten Ausfall einer Schlüsselperson bei einer Nachfolgeentscheidung, einschließlich Unterlagen und Zustimmungen.'},
 nextgen:{en:'Rehearse a bounded ownership decision with an unfamiliar question and an agreed mentor or supervisor.',cs:'Nacvičte vymezené vlastnické rozhodnutí v nové situaci za pomoci dohodnutého mentora.',de:'Erproben Sie eine begrenzte Eigentümerentscheidung bei unbekannter Sachlage mit vereinbarter Begleitung.'},
 shareholder:{en:'Test a contested resolution and identify who may vote, seek information and escalate disagreement.',cs:'Prověřte sporné usnesení a určete, kdo může hlasovat, požadovat informace a řešit nesouhlas.',de:'Prüfen Sie einen strittigen Beschluss und klären Sie Stimmrechte, Informationsrechte und Eskalation.'},
 adviser:{en:'Test a disagreement between two advisers and document who coordinates the response and is accountable.',cs:'Prověřte rozpor mezi dvěma poradci a zaznamenejte, kdo koordinuje řešení a odpovídá za výsledek.',de:'Erproben Sie widersprüchliche Empfehlungen zweier Berater und dokumentieren Sie Koordination und Verantwortung.'},
 investment:{en:'Test a sharp market fall, an urgent liquidity need and the unavailability of a principal portfolio manager.',cs:'Prověřte prudký propad trhu, naléhavou potřebu likvidity a nedostupnost hlavního portfolio manažera.',de:'Prüfen Sie einen starken Marktrückgang, dringenden Liquiditätsbedarf und den Ausfall eines leitenden Portfoliomanagers.'}
};
const status=(p,t)=>{
 const key=String(p?.status||'unclear').toLowerCase();
 const en= {green:'reported as established',amber:'reported as developing',red:'reported as requiring attention',grey:'not sufficiently scored',
 established:'reported as established',developing:'reported as developing',exposed:'reported as requiring attention',unclear:'not sufficiently scored'};
 const cs={green:'uváděna jako zakotvená',amber:'uváděna jako rozvíjející se',red:'uváděna jako zranitelná',grey:'nehodnocená',
 established:'uváděna jako zakotvená',developing:'uváděna jako rozvíjející se',exposed:'uváděna jako zranitelná',unclear:'nehodnocená'};
 const de={green:'als gefestigt berichtet',amber:'als im Aufbau berichtet',red:'als prüfungsbedürftig berichtet',grey:'nicht bewertet',
 established:'als gefestigt berichtet',developing:'als im Aufbau berichtet',exposed:'als prüfungsbedürftig berichtet',unclear:'nicht bewertet'};
 return ({en,cs,de}[t]||en)[key]||'not sufficiently scored';
};
const valid=p=>Number.isFinite(p?.mean)&&!['grey','unclear'].includes(p?.status);
const label=p=>String(p?.name||p?.label||p?.title||'').trim();
const ref=p=>String(p?.trace||(Array.isArray(p?.questions)?p.questions.join(', '):'')).trim();
const fmt=(template,vars)=>template.replace(/\{(\w+)\}/g,(_,k)=>String(vars[k]??''));
export function expandStrengthsAndExposures({review,language,counts,pairs,dimensions,priorities,existing}){
 const c=text[language],domain=specifics[review]?.[language],scenario=scenarios[review]?.[language];
 if(!c||!domain||!scenario||pairs?.length!==24||dimensions?.length!==6||priorities?.length!==3)throw Error('invalid_exposures_input');
 const ordered=pairs.filter(valid).sort((a,b)=>b.mean-a.mean);
 const strong=ordered.find(p=>['green','established'].includes(p.status))||null;
 const other=ordered.filter(p=>p!==strong)[0]||null;
 const weak=[...ordered].reverse().find(p=>['red','amber','exposed','developing'].includes(p.status))||null;
 const main=strong||ordered[0]||null;
 const second=other||main;
 const firstRef=ref(main),secondRef=ref(second),weakRef=ref(weak),priority=priorities[0];
 const d={
  first:label(main)||'',firstRef:firstRef||'not scored',
  second:label(second)||label(main)||'',secondRef:secondRef||'not scored',
  strong:label(strong)||'',weak:label(weak)||'',weakRef:weakRef||'not scored',
  weakStatus:status(weak,language),refs:[firstRef,weakRef].filter(Boolean).join('; '),
  unknown:counts?.unknown??0,na:counts?.na??0,
  domain,scenario,priority:label(priority),priorityRef:ref(priority)
 };
 const page1=[
  strong?fmt(c.strengthIntro,d):c.noStrength,
  other&&main?fmt(c.strengthSecond,d):c.strengthNotProven,
  strong&&weak&&strong.mean-weak.mean>=1.5?fmt(c.compare,d):c.comparisonFallback,
  c.resilience
 ];
 const page2=[
  weak?fmt(c.exposuresIntro,d):c.noExposure,
  fmt(c.consequence,{...d,weak:label(weak)||label(priorities[0])}),
  fmt(c.uncertainty,d),
  fmt(c.stress,d),
  fmt(c.action,d)
 ];
 const para=arr=>arr.map(value=>({type:'paragraph',text:value}));
 const words=(page1.join(' ')+' '+page2.join(' ')).trim().split(/\s+/).length;
 return {version:EXPOSURES_VERSION,first:para(page1),second:{title:c.second,items:para(page2),interpretive:true},wordCount:words,sourceReferences:[firstRef,secondRef,weakRef].filter(Boolean)};
}
