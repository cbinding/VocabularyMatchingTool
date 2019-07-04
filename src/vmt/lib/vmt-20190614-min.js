
﻿;Vue.component('usw-aat-concept-details',{template:`<div class='usw-aat-concept-details' :style='styles'>
  <span v-if='details.preflabel !== ""'><i class="fas fa-tag"></i>&nbsp;<strong>{{ details.preflabel }}</strong> (see <a target='aat' :href='concepturi'>{{ concepturi }}</a>)</span>
  <!--<div v-if='details.hierarchyabbrev !== ""'>({{ details.hierarchyabbrev }})</div>-->        
  <usw-aat-concept-relations :concepturi='concepturi' @conceptSelected='conceptSelected'></usw-aat-concept-relations>
  <div v-if='details.scopenote !== ""'><strong>Note:</strong>&nbsp;<em>{{ details.scopenote }}</em></div>  
  <usw-aat-concept-hierarchy :parentstring='details.hierarchy' :term='details.preflabel'></usw-aat-concept-hierarchy>
  <usw-aat-concept-labels :concepturi='concepturi'></usw-aat-concept-labels>
 </div>`,props:['concepturi'],data:function(){return{cache:{},details:{identifier:"",preflabel:"",scopenote:"",hierarchy:"",hierarchyabbrev:""},styles:{width:'100%',height:'200px',border:'1px solid lightgray',padding:'5px',margin:'0px',cursor:'pointer',overflow:'scroll'}}},mounted(){if(localStorage.getItem('aatconceptdetails')){try{this.cache=JSON.parse(localStorage.getItem('aatconceptdetails'));}catch(e){localStorage.removeItem('aatconceptdetails');}}},beforeDestroy(){const parsed=JSON.stringify(this.cache);localStorage.setItem('aatconceptdetails',parsed);},watch:{concepturi:function(newValue,oldValue){this.getConceptDetails();}},methods:{conceptSelected(evt){this.concepturi=evt.uri;this.$emit('conceptSelected',evt);},getConceptDetails:function(){var self=this;if(self.concepturi!==""){if(self.cache.hasOwnProperty(self.concepturi)){self.details=self.cache[self.concepturi];}
else{API.getConceptDetails(self.concepturi,{success:function(json){if(json.length>0){var item={identifier:(json[0].identifier.value||"").trim(),preflabel:(json[0].preflabel.value||"").trim(),scopenote:(json[0].scopenote.value||"").trim(),hierarchy:(json[0].hierarchy.value||"").trim(),hierarchyabbrev:(json[0].hierarchyabbrev.value||"").trim(),};self.cache[self.concepturi]=item;self.details=item;}},error:function(msg){self.details={identifier:"",preflabel:"",scopenote:"",hierarchy:"",hierarchyabbrev:""};}});}}}}});﻿;Vue.component('usw-aat-concept-hierarchy',{template:`<div class='usw-aat-concept-hierarchy'>
  <details v-if='parentstring.trim() !== ""'>
  <summary><strong>Hierarchy</strong></summary>
  <ul id='concept-hierarchy' :style='styles'>
   <li v-for='(value, key) in hierarchy'>
    <span>{{ "...".repeat(key) }}</span>
    <span v-if="key+1 &lt; hierarchy.length">{{ value }}</span>
    <strong v-else>{{ value }}</strong>
   </li>  
  </ul>
  </details> 
  </div>`,props:['term','parentstring'],data:function(){return{styles:{"list-style-type":"none"}}},computed:{hierarchy:function(){var arr=this.parentstring.split(/,(?![^<]*\>)/).reverse().map(s=>s.trim());arr.push(this.term);return arr;}}});﻿"use strict";Vue.component('usw-aat-concept-labels',{template:`<div class='usw-aat-concept-labels'>
  <details v-if='labels.length > 0'>
  <summary><strong>Terms</strong></summary>
  <ul id='concept-labels'>
  <li v-for='(lbls, key, index) in groupedLabels'><span class='language'>{{ key }}</span>
   <ul><li v-for='label in lbls'>{{ label }}</li></ul>
  </li>
  </ul>
  </details>
  </div>`,props:['concepturi'],data:function(){return{labels:[],cache:{}}},mounted(){if(localStorage.getItem('aatconceptlabels')){try{this.cache=JSON.parse(localStorage.getItem('aatconceptlabels'));}catch(e){localStorage.removeItem('aatconceptlabels');}}},beforeDestroy(){const parsed=JSON.stringify(this.cache);localStorage.setItem('aatconceptlabels',parsed);},watch:{concepturi:function(newValue,oldValue){this.getLabels();}},methods:{getLabels:function(){var self=this;if(self.concepturi!==""){if(self.cache.hasOwnProperty(self.concepturi)){self.labels=self.cache[self.concepturi];}
else
{API.getConceptLabels(self.concepturi,{success:function(data){self.cache[self.concepturi]=data;self.labels=data;},error:function(msg){self.labels=[];}});}}}},computed:{groupedLabels:function(){var self=this;var grouped={};self.labels.map(label=>{if(!grouped.hasOwnProperty(label.language))
grouped[label.language]=[];grouped[label.language].push(label.value);});for(var g in grouped){if(grouped.hasOwnProperty(g))
grouped[g].sort();}
return grouped;}}});﻿"use strict";Vue.component('usw-aat-concept-relations',{template:`<div class='usw-aat-concept-relations'>  
  <div v-for='(relations, key, index) in groupedRelations'>
   <strong>{{ getRelationshipLabel(key) }}:</strong>
   <span v-for='relation in relations'>&nbsp;<a :href='relation.uri' @click.prevent='conceptSelected'><i class="fas fa-tag"></i>&nbsp;{{ relation.label }}</a>
   </span>   
  </div>
  </div>`,props:['concepturi'],data:function(){return{relations:[],cache:{}}},mounted(){if(localStorage.getItem('aatconceptrelations')){try{this.cache=JSON.parse(localStorage.getItem('aatconceptrelations'));}catch(e){localStorage.removeItem('aatconceptrelations');}}},beforeDestroy(){const parsed=JSON.stringify(this.cache);localStorage.setItem('aatconceptrelations',parsed);},watch:{concepturi:function(newValue,oldValue){this.getRelations();}},methods:{conceptSelected:function(evt){this.$emit('conceptSelected',{uri:evt.target.href,label:evt.target.text});},getRelations:function(){var self=this;if(self.concepturi!==""){if(self.cache.hasOwnProperty(self.concepturi)){self.relations=self.cache[self.concepturi];}
else{API.getConceptRelations(self.concepturi,{success:function(data){self.cache[self.concepturi]=data;self.relations=data;},error:function(msg){self.relations=[];}});}}},getRelationshipLabel:function(uri){let label="";switch(uri.trim()){case"http://www.w3.org/2004/02/skos/core#broader":label="Broader";break;case"http://www.w3.org/2004/02/skos/core#narrower":label="Narrower";break;default:label="Related";break;}
return label;}},computed:{groupedRelations:function(){var self=this;var grouped={};self.relations.map(relation=>{if(!grouped.hasOwnProperty(relation.relationship))
grouped[relation.relationship]=[];grouped[relation.relationship].push(relation);});for(var g in grouped){if(grouped.hasOwnProperty(g))
grouped[g].sort();}
return grouped;}}});﻿"use strict";Vue.component('usw-aat-search-control',{template:`<div class='usw-aat-search-control'>
  <form @submit.prevent="$emit('submit', searchfor)" style="width:100%">
        <label for='searchFor'><i class='fas fa-search' title='Search for'></i> {{ labeltext }}</label>
        <input id='searchFor' type='search' :placeholder='placeholder' v-model='searchfor'>
        <button type='submit' :class='{ "button-primary": searchfor.length > 2 }' :value='buttontext'><i class="fas fa-search"></i> {{ buttontext }}</button>    
        </form>
  </div>`,props:{labeltext:{type:String,default:function(){return'AAT search'},},buttontext:{type:String,default:function(){return"Go"},},placeholder:{type:String,default:function(){return'Search for'},}},data:function(){return{searchfor:""}}});﻿;Vue.component('usw-aat-search-results',{template:`<div class='usw-aat-search-results'>
  <ul id='aat-search-results' :style='styles'>
   <li v-for='(result, key) in results' >
    <details>
    <summary><!--<strong>-->
     <a target='_blank'
                        :title='result.scopenote.value'
                        :href='result.concepturi' 
                        :xml:lang='result.conceptlabel.language' 
      @click.prevent='selected'><i class="fas fa-tag"></i>&nbsp;{{ result.conceptlabel.value }}</a>
    <!--</strong>-->
    </summary>
    <div :xml:lang='result.parentstring.language'>({{ result.parentstring.value }})</div> 
    </details>
   </li>
        </ul>
  <div class='u-pull-right'>{{ results.length }} results</div>
        </div>`,props:['searchfor'],data:function(){return{results:[],cache:{},styles:{width:'100%',height:'200px',border:'1px solid lightgray',padding:'5px',margin:'0px',cursor:'pointer',overflow:'scroll'}}},mounted(){if(localStorage.getItem('aatsearchresults')){try{this.cache=JSON.parse(localStorage.getItem('aatsearchresults'));}catch(e){localStorage.removeItem('aatsearchresults');}}},beforeDestroy(){const parsed=JSON.stringify(this.cache);localStorage.setItem('aatsearchresults',parsed);},watch:{searchfor:function(newValue,oldValue){this.search();}},methods:{selected:function(evt){this.$emit('selected',{uri:evt.target.href,label:evt.target.innerText});},search:function(){var self=this;if(self.searchfor!==""){if(self.cache.hasOwnProperty(self.searchfor)){self.results=self.cache[self.searchfor];}
else
{API.searchForTerm(self.searchfor,{success:function(data){self.cache[self.searchfor]=data;self.results=data;},error:function(txt){self.results=[];},complete:function(){}});}}}}});﻿"use strict";Vue.component('usw-aat-search',{template:`<div class='usw-aat-search'>  
  <usw-aat-search-control @submit='searchRequested'></usw-aat-search-control>  
  <usw-aat-search-results :searchfor='searchfor' @selected='conceptSelected'></usw-aat-search-results>
  <usw-aat-concept-details :concepturi='selecteduri' @conceptSelected='conceptSelected'></usw-aat-concept-details>
  <div>&nbsp;</div>
        <div class='u-pull-right'>  
   <button 
    :class='{ "button-primary": selecteduri.length > 0 }' 
    :disabled='selecteduri == ""'
    @click='$emit("select", {uri: selecteduri, label: selectedlabel})'><i class="fas fa-check-square"></i> Select</button>
   <button class='button-primary' @click='$emit("cancel")'><i class="fas fa-window-close"></i> Cancel</button>
   <div>&nbsp;</div>
  </div>
  </div>`,data:function(){return{searchfor:"",selecteduri:"",selectedlabel:""}},methods:{searchRequested(evt){this.searchfor=evt;},conceptSelected(evt){this.selecteduri=evt.uri.trim();this.selectedlabel=evt.label.trim();}}});﻿;Vue.component('usw-language-select',{template:`<div class="usw-language-select">
  <i class="fas fa-language"></i>
  <select v-model="selected" :style="styles" @change="onChange">
  <!--<select v-bind:selected="selected" :style="styles" @change="onChange">-->
  <option disabled value=''>{{ title }}:</option>
  <option v-for="(item, key) in filteredItems" :xml:lang="item.id" :key="item.id" :value="item.id" :title="item.label">{{ item.label }}</option>    
  </select>
  </div>`,model:{event:'change',},props:{displayValues:{type:String,default(){return"fr, de, en, es, it, nl"},},selected:{type:String,default:"en",}},data:function(){return{items:[{id:"aa",label:"",labelEN:"Afar",title:""},{id:"ab",label:"",labelEN:"Abkhazian",title:""},{id:"af",label:"Afrikaans",labelEN:"Afrikaans",title:"Taal"},{id:"ak",label:"",labelEN:"Akan",title:""},{id:"sq",label:"shqiptar",labelEN:"Albanian",title:"Gjuhe"},{id:"am",label:"",labelEN:"Amharic",title:"ቋንቋ"},{id:"ar",label:"عربى",labelEN:"Arabic",title:"لغة"},{id:"an",label:"",labelEN:"Aragonese",title:""},{id:"hy",label:"հայերեն",labelEN:"Armenian",title:"Լեզու"},{id:"as",label:"",labelEN:"Assamese",title:""},{id:"av",label:"",labelEN:"Avaric",title:""},{id:"ae",label:"",labelEN:"Avestan",title:""},{id:"ay",label:"",labelEN:"Aymara",title:""},{id:"az",label:"",labelEN:"Azerbaijani",title:"Dil"},{id:"ba",label:"",labelEN:"Bashkir",title:""},{id:"bm",label:"",labelEN:"Bambara",title:""},{id:"eu",label:"Euskal",labelEN:"Basque",title:"Hizkuntza"},{id:"be",label:"беларускі",labelEN:"Belarusian",title:"мова"},{id:"bn",label:"বাঙালি",labelEN:"Bengali",title:"ভাষা"},{id:"bh",label:"",labelEN:"Bihari languages",title:""},{id:"bi",label:"",labelEN:"Bislama",title:""},{id:"bs",label:"Bosanski",labelEN:"Bosnian",title:"Jezik"},{id:"br",label:"",labelEN:"Breton",title:""},{id:"bg",label:"български",labelEN:"Bulgarian",title:"език"},{id:"my",label:"",labelEN:"Burmese",title:""},{id:"ca",label:"català",labelEN:"Catalan; Valencian",title:"Llenguatge"},{id:"ch",label:"",labelEN:"Chamorro",title:""},{id:"ce",label:"",labelEN:"Chechen",title:""},{id:"zh",label:"中文",labelEN:"Chinese",title:"语言"},{id:"cu",label:"",labelEN:"Church Slavic; Old Slavonic; Church Slavonic; Old Bulgarian; Old Church Slavonic",title:""},{id:"cv",label:"",labelEN:"Chuvash",title:""},{id:"kw",label:"",labelEN:"Cornish",title:""},{id:"co",label:"Corsu",labelEN:"Corsican",title:"Lingua"},{id:"cr",label:"",labelEN:"Cree",title:""},{id:"cs",label:"čeština",labelEN:"Czech",title:"Jazyk"},{id:"da",label:"dansk",labelEN:"Danish",title:"Sprog"},{id:"dv",label:"",labelEN:"Divehi; Dhivehi; Maldivian",title:""},{id:"nl",label:"Nederlands",labelEN:"Dutch; Flemish",title:"Taal"},{id:"dz",label:"",labelEN:"Dzongkha",title:""},{id:"en",label:"English",labelEN:"English",title:"Language"},{id:"eo",label:"Esperanto",labelEN:"Esperanto",title:"Lingvo"},{id:"et",label:"Eesti",labelEN:"Estonian",title:"Keel"},{id:"ee",label:"",labelEN:"Ewe",title:""},{id:"fo",label:"",labelEN:"Faroese",title:""},{id:"fj",label:"",labelEN:"Fijian",title:""},{id:"fi",label:"Suomalainen",labelEN:"Finnish",title:"Kieli"},{id:"fr",label:"Français",labelEN:"French",title:"La langue"},{id:"fy",label:"Frysk",labelEN:"Frisian",title:"Taal"},{id:"ff",label:"",labelEN:"Fulah",title:""},{id:"ka",label:"ქართული",labelEN:"Georgian",title:"ენა"},{id:"de",label:"Deutsche",labelEN:"German",title:"Sprache"},{id:"gd",label:"Gàidhlig",labelEN:"Gaelic (Scottish)",title:"Cànan"},{id:"ga",label:"Gaeilge",labelEN:"Gaelic (Irish)",title:"Teanga"},{id:"gl",label:"Galego",labelEN:"Galician",title:"Lingua"},{id:"gv",label:"",labelEN:"Manx",title:""},{id:"el",label:"Ελληνικά",labelEN:"Greek, Modern (1453-)",title:"Γλώσσα"},{id:"gn",label:"",labelEN:"Guarani",title:""},{id:"gu",label:"ગુજરાતી",labelEN:"Gujarati",title:"ભાષા"},{id:"ht",label:"Kreyòl Ayisyen",labelEN:"Haitian; Haitian Creole",title:"Lang"},{id:"ha",label:"Hausa",labelEN:"Hausa",title:"Harshe"},{id:"he",label:"עברית",labelEN:"Hebrew",title:"שפה"},{id:"hz",label:"",labelEN:"Herero",title:""},{id:"hi",label:"हिंदी",labelEN:"Hindi",title:"भाषा"},{id:"ho",label:"",labelEN:"Hiri Motu",title:""},{id:"hr",label:"Hrvatski",labelEN:"Croatian",title:"Jezik"},{id:"hu",label:"Magyar",labelEN:"Hungarian",title:"Nyelv"},{id:"ig",label:"Igbo",labelEN:"Igbo",title:"Asụsụ"},{id:"is",label:"Íslensku",labelEN:"Icelandic",title:"Tungumál"},{id:"io",label:"",labelEN:"Ido",title:""},{id:"ii",label:"",labelEN:"Sichuan Yi; Nuosu",title:""},{id:"iu",label:"",labelEN:"Inuktitut",title:""},{id:"ie",label:"",labelEN:"Interlingue; Occidental",title:""},{id:"ia",label:"",labelEN:"Interlingua",title:""},{id:"id",label:"bahasa Indonesia",labelEN:"Indonesian",title:"Bahasa"},{id:"ik",label:"",labelEN:"Inupiaq",title:""},{id:"it",label:"Italiano",labelEN:"Italian",title:"linguaggio"},{id:"jv",label:"Jawa",labelEN:"Javanese",title:"Basa"},{id:"ja",label:"日本人",labelEN:"Japanese",title:"言語"},{id:"kl",label:"",labelEN:"Kalaallisut; Greenlandic",title:""},{id:"kn",label:"ಕನ್ನಡ",labelEN:"Kannada",title:"ಭಾಷೆ"},{id:"ks",label:"",labelEN:"Kashmiri",title:""},{id:"kr",label:"",labelEN:"Kanuri",title:""},{id:"kk",label:"Қазақша",labelEN:"Kazakh",title:"Тіл"},{id:"km",label:"ភាសាខ្មែរ",labelEN:"Khmer",title:"ភាសា"},{id:"ki",label:"",labelEN:"Kikuyu; Gikuyu",title:""},{id:"rw",label:"",labelEN:"Kinyarwanda",title:""},{id:"ky",label:"Кыргызча",labelEN:"Kirghiz; Kyrgyz",title:"тил"},{id:"kv",label:"",labelEN:"Komi",title:""},{id:"kg",label:"",labelEN:"Kongo",title:""},{id:"ko",label:"한국어",labelEN:"Korean",title:"언어"},{id:"kj",label:"",labelEN:"Kuanyama; Kwanyama",title:""},{id:"ku",label:"Kurdî",labelEN:"Kurdish",title:"Ziman"},{id:"lo",label:"ລາວ",labelEN:"Lao",title:"ພາສາ"},{id:"la",label:"Latine",labelEN:"Latin",title:"Lingua"},{id:"lv",label:"Latviešu",labelEN:"Latvian",title:"Valoda"},{id:"li",label:"",labelEN:"Limburgan; Limburger; Limburgish",title:""},{id:"ln",label:"",labelEN:"Lingala",title:""},{id:"lt",label:"Lietuvių",labelEN:"Lithuanian",title:"Kalba"},{id:"lb",label:"Letzeburgesch",labelEN:"Luxembourgish",title:"Sprooch"},{id:"lu",label:"",labelEN:"Luba-Katanga",title:""},{id:"lg",label:"",labelEN:"Ganda",title:""},{id:"mk",label:"Македонски",labelEN:"Macedonian",title:"Јазик"},{id:"mh",label:"",labelEN:"Marshallese",title:""},{id:"ml",label:"മലയാളം",labelEN:"Malayalam",title:"ഭാഷ"},{id:"mi",label:"Maori",labelEN:"Maori",title:"Reo"},{id:"mr",label:"मराठी",labelEN:"Marathi",title:"भाषा"},{id:"ms",label:"Melayu",labelEN:"Malay",title:"Bahasa"},{id:"mg",label:"Malagasy",labelEN:"Malagasy",title:"fiteny"},{id:"mt",label:"Malti",labelEN:"Maltese",title:"Lingwa"},{id:"mn",label:"Монгол хэл дээр",labelEN:"Mongolian",title:"Хэл"},{id:"na",label:"",labelEN:"Nauru",title:""},{id:"nv",label:"",labelEN:"Navajo; Navaho",title:""},{id:"nr",label:"",labelEN:"Ndebele, South; South Ndebele",title:""},{id:"nd",label:"",labelEN:"Ndebele, North; North Ndebele",title:""},{id:"ng",label:"",labelEN:"Ndonga",title:""},{id:"ne",label:"नेपाली",labelEN:"Nepali",title:"भाषा"},{id:"no",label:"norsk",labelEN:"Norwegian",title:"Språk"},{id:"ny",label:"",labelEN:"Chichewa; Chewa; Nyanja",title:""},{id:"oc",label:"",labelEN:"Occitan (post 1500); Provençal",title:""},{id:"oj",label:"",labelEN:"Ojibwa",title:""},{id:"or",label:"",labelEN:"Oriya",title:""},{id:"om",label:"",labelEN:"Oromo",title:""},{id:"os",label:"",labelEN:"Ossetian; Ossetic",title:""},{id:"pa",label:"ਪੰਜਾਬੀ",labelEN:"Punjabi",title:"ਭਾਸ਼ਾ"},{id:"fa",label:"فارسی",labelEN:"Persian",title:"زبان"},{id:"pi",label:"",labelEN:"Pali",title:""},{id:"pl",label:"Polskie",labelEN:"Polish",title:"Język"},{id:"pt",label:"português",labelEN:"Portuguese",title:"Língua"},{id:"ps",label:"پښتو",labelEN:"Pushto; Pashto",title:"ژبه"},{id:"qu",label:"",labelEN:"Quechua",title:""},{id:"rm",label:"",labelEN:"Romansh",title:""},{id:"ro",label:"Română",labelEN:"Romanian; Moldavian; Moldovan",title:"Limba"},{id:"rn",label:"",labelEN:"Rundi",title:""},{id:"ru",label:"русский",labelEN:"Russian",title:"язык"},{id:"sg",label:"",labelEN:"Sango",title:""},{id:"sa",label:"",labelEN:"Sanskrit",title:""},{id:"si",label:"",labelEN:"Sinhala; Sinhalese",title:"භාෂාව"},{id:"sk",label:"slovenský",labelEN:"Slovak",title:"Jazyk"},{id:"sl",label:"Slovenščina",labelEN:"Slovenian",title:"Jezik"},{id:"se",label:"",labelEN:"Northern Sami",title:""},{id:"sm",label:"Samoa",labelEN:"Samoan",title:"Gagana"},{id:"sn",label:"Shona",labelEN:"Shona",title:"Mutauro"},{id:"sd",label:"سنڌي",labelEN:"Sindhi",title:"ٻولي"},{id:"so",label:"Somali",labelEN:"Somali",title:"Luuqadda"},{id:"st",label:"",labelEN:"Sotho, Southern",title:""},{id:"es",label:"Español",labelEN:"Spanish; Castilian",title:"Idioma"},{id:"sc",label:"",labelEN:"Sardinian",title:""},{id:"sr",label:"Српски",labelEN:"Serbian",title:"Језик"},{id:"ss",label:"",labelEN:"Swati",title:""},{id:"su",label:"Sunda",labelEN:"Sundanese",title:"basa"},{id:"sw",label:"Kiswahili",labelEN:"Swahili",title:"Lugha"},{id:"sv",label:"svenska",labelEN:"Swedish",title:"Språk"},{id:"ty",label:"",labelEN:"Tahitian",title:""},{id:"ta",label:"தமிழ்",labelEN:"Tamil",title:"மொழி"},{id:"tt",label:"",labelEN:"Tatar",title:""},{id:"te",label:"తెలుగు",labelEN:"Telugu",title:"భాషా"},{id:"tg",label:"Тоҷикӣ",labelEN:"Tajik",title:"Забон"},{id:"tl",label:"",labelEN:"Tagalog",title:""},{id:"th",label:"ไทย",labelEN:"Thai",title:"ภาษา"},{id:"bo",label:"",labelEN:"Tibetan",title:""},{id:"ti",label:"",labelEN:"Tigrinya",title:""},{id:"to",label:"",labelEN:"Tonga (Tonga Islands)",title:""},{id:"tn",label:"",labelEN:"Tswana",title:""},{id:"ts",label:"",labelEN:"Tsonga",title:""},{id:"tk",label:"",labelEN:"Turkmen",title:""},{id:"tr",label:"Türk",labelEN:"Turkish",title:"Dil"},{id:"tw",label:"",labelEN:"Twi",title:""},{id:"ug",label:"",labelEN:"Uighur; Uyghur",title:""},{id:"uk",label:"Українська",labelEN:"Ukrainian",title:"Мова"},{id:"ur",label:"اردو",labelEN:"Urdu",title:"زبان"},{id:"uz",label:"O'zbek",labelEN:"Uzbek",title:"Til"},{id:"ve",label:"",labelEN:"Venda",title:""},{id:"vi",label:"Tiếng Việt",labelEN:"Vietnamese",title:"Ngôn ngữ"},{id:"vo",label:"",labelEN:"Volapük",title:""},{id:"cy",label:"Cymraeg",labelEN:"Welsh",title:"Iaith"},{id:"wa",label:"",labelEN:"Walloon",title:""},{id:"wo",label:"",labelEN:"Wolof",title:""},{id:"xh",label:"isiXhosa",labelEN:"Xhosa",title:"ULwimi"},{id:"yi",label:"Yiddish",labelEN:"Yiddish",title:"שפּראַך"},{id:"yo",label:"Yorùbá",labelEN:"Yoruba",title:"Ede"},{id:"za",label:"",labelEN:"Zhuang; Chuang",title:""},{id:"zu",label:"Zulu",labelEN:"Zulu",title:"Ulimi"},],styles:{padding:'5px',margin:'5px',cursor:'pointer'}}},computed:{title:function(){let item=this.items.find(x=>x.id==this.selected);if(item&&item.title!=="")
return item.title;else
return"Language";},filteredItems:function(){return this.items.filter(item=>this.displayValuesArray.includes(item.id)).sort((a,b)=>a.label.localeCompare(b.label));},displayValuesArray:function(){return this.displayValues.split(',').map(s=>s.trim());}},methods:{onChange(){this.$emit('change',this.selected);}},});﻿"use strict";Vue.component('usw-modal',{template:`<transition name="modal">
  <div class="modal-mask">
    <div class="modal-wrapper">
   <div class="modal-container">

     <div class="modal-header">
    <slot name="header"></slot>
     </div>

     <div class="modal-body">
    <slot name="body">def body</slot>
     </div>

     <div class="modal-footer">
    <slot name="footer"></slot>                
     </div>
     
   </div><!--end .modal-container-->
    </div><!--end .modal-wrapper-->
  </div><!--end .modal-mask-->
   </transition>`});﻿"use strict"
const API={defaults:{language:"en",limit:0,offset:0,success:function(json){},error:function(msg){},complete:function(msg){}},getConceptDetails:function(uri,options={}){let opts=Object.assign({},this.defaults,options||{});let sparql=`PREFIX xl: <http://www.w3.org/2008/05/skos-xl#>
  PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
  PREFIX dc: <http://purl.org/dc/elements/1.1/>
  PREFIX gvp: <http://vocab.getty.edu/ontology#>
  PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
  SELECT DISTINCT ?identifier ?preflabel ?scopenote ?hierarchy ?hierarchyabbrev WHERE {
   <${ uri }> dc:identifier ?identifier ; 
  gvp:parentString ?hierarchy ;
  gvp:parentStringAbbrev ?hierarchyabbrev ;
  gvp:prefLabelGVP [ xl:literalForm ?preflabel ] .
  OPTIONAL {
   <${ uri }> skos:scopeNote [rdf:value ?scopenote] .
   FILTER(langMatches(lang(?scopenote), '${opts.language}'))
  }
  } LIMIT 1`;this.runSPARQLreturnJSON(sparql,{success:function(json){var data=(json||[]).map(item=>{return{identifier:{value:`${ item.identifier ? API.iso2utf(item.identifier.value) : '' }`,language:'en'},preflabel:{value:`${ item.preflabel ? API.iso2utf(item.preflabel.value) : '' }`,language:`${ item.preflabel ? item.preflabel["xml:lang"] : '' }`},scopenote:{value:`${ item.scopenote ? API.iso2utf(item.scopenote.value) : '' }`,language:`${ item.scopenote ? item.scopenote["xml:lang"] : '' }`},hierarchy:{value:`${ item.hierarchy ? API.iso2utf(item.hierarchy.value) : '' }`,language:'en'},hierarchyabbrev:{value:`${ item.hierarchyabbrev ? API.iso2utf(item.hierarchyabbrev.value) : '' }`,language:'en'}}});opts.success(data);},error:opts.error,complete:opts.complete});},getConceptLabels:function(uri,options={}){let opts=Object.assign({},this.defaults,options||{});let sparql=`PREFIX xl: <http://www.w3.org/2008/05/skos-xl#>  
 SELECT DISTINCT ?label WHERE {
  <${ uri }> (xl:prefLabel | xl:altLabel) [xl:literalForm ?label] .
  }`;this.runSPARQLreturnJSON(sparql,{success:function(json){var data=(json||[]).map(item=>{return{value:`${ item.label ? API.iso2utf(item.label.value) : '' }`,language:`${ item.label ? item.label['xml:lang'] : '' }`}});opts.success(data);},error:opts.error,complete:opts.complete});},getConceptRelations:function(concepturi,options={}){let opts=Object.assign({},this.defaults,options||{});let limit=opts.limit?parseInt(opts.limit,10):0;let offset=opts.offset?parseInt(opts.offset,10):0;let sparql=`PREFIX xl: <http://www.w3.org/2008/05/skos-xl#>  
  PREFIX gvp: <http://vocab.getty.edu/ontology#>
  PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
     
  SELECT DISTINCT ?relationship ?uri ?label WHERE { 
   {
    <${ concepturi }> ?prop ?uri .
    ?prop rdfs:subPropertyOf gvp:broader .    
    BIND(skos:broader AS ?relationship) .
   }
   UNION
   {
    ?uri ?prop <${ concepturi }> .
    ?prop rdfs:subPropertyOf gvp:broader .    
    BIND(skos:narrower AS ?relationship) .
   }
   UNION
   {
    <${ concepturi }> ?prop ?uri .    
    ?prop rdfs:subPropertyOf skos:related .
    BIND(skos:related AS ?relationship) .
   }
   ?uri gvp:prefLabelGVP [ xl:literalForm ?label ] .
  }  
  ${offset > 0 ? 'OFFSET ${offset}' : ''}
  ${limit > 0 ? 'LIMIT ${limit}' : ''}`;this.runSPARQLreturnJSON(sparql,{success:function(json){var data=(json||[]).map(item=>{return{relationship:`${ item.relationship ? item.relationship.value : '' }`,uri:`${ item.uri ? item.uri.value : '' }`,label:`${ item.label ? API.iso2utf(item.label.value) : '' }`}});opts.success(data);},error:opts.error,complete:opts.complete});},searchForTerm:function(term='',options={}){let opts=Object.assign({},this.defaults,options||{});let limit=opts.limit?parseInt(opts.limit,10):0;let offset=opts.offset?parseInt(opts.offset,10):0;let sparql=`PREFIX aat: <http://vocab.getty.edu/aat/>
    PREFIX gvp: <http://vocab.getty.edu/ontology#>
    PREFIX luc: <http://www.ontotext.com/owlim/lucene#>
    PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
    PREFIX xl: <http://www.w3.org/2008/05/skos-xl#>  
   
    SELECT DISTINCT ?concepturi ?conceptlabel ?scopenote ?parentstring WHERE {
        ?concepturi a gvp:Concept; 
    skos:inScheme aat: ; 
    luc:term '${term}' ;
    gvp:prefLabelGVP [xl:literalForm ?conceptlabel] ;
    gvp:parentStringAbbrev ?parentstring .       
OPTIONAL {
    ?concepturi skos:scopeNote [rdf:value ?scopenote] .
    FILTER(langMatches(lang(?scopenote), '${opts.language}'))
}     
}
ORDER BY ASC(str(?conceptlabel)) 
${offset > 0 ? 'OFFSET ${offset}' : ''}
${limit > 0 ? 'LIMIT ${limit}' : ''}`;this.runSPARQLreturnJSON(sparql,{success:function(json){var data=(json||[]).map(item=>{return{concepturi:`${ item.concepturi ? item.concepturi.value : '' }`,conceptlabel:{value:`${ item.conceptlabel ? API.iso2utf(item.conceptlabel.value) : '' }`,language:`${ item.conceptlabel ? item.conceptlabel["xml:lang"] : '' }`,},scopenote:{value:`${ item.scopenote ? API.iso2utf(item.scopenote.value) : '' }`,language:`${ item.scopenote ? item.scopenote["xml:lang"] : '' }`,},parentstring:{value:`${ API.iso2utf(item.parentstring.value) }`,language:'en'}}});opts.success(data);},error:opts.error,complete:opts.complete});},iso2utf:function(iso){var utf=iso;try{utf=decodeURIComponent(escape(iso));}catch(ignore){}
return utf;},runSPARQLreturnJSON:function(sparql,options){var xhr=new XMLHttpRequest();xhr.onreadystatechange=function(){if(this.readyState==4){if(this.status==200){let json=JSON.parse(xhr.responseText);options.success(json.results.bindings);}
else{options.error(xhr.responseText);}
options.complete();}};let aatproxy=`${ window.location.href.substring(0, window.location.href.lastIndexOf('/')+1) }sparql-proxy.php`;let endpoint="http://vocab.getty.edu/sparql.json";let uri=`${ aatproxy }?service-uri=${ endpoint }&query=${ encodeURIComponent(sparql) }`;xhr.open("GET",uri,true);xhr.send();}}