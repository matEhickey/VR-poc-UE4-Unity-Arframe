# RedactionAframe article


## Brainstorm
Entity component system -> propre pour intégration  
- Les entités représentent les objets et leurs données.
- Les composents représentent les comportement des objets.  
- les sytemes représentent des composants qui manipulent plusieurs composants pour, par exemple, les associer, ou les manipuler a chaque frame.   

Principe:
Utilisation du DOM html pour représenter nos données (chaque tag représente un entity, et attributs représentent les composants. )
Chaque composant possèdent un cycle de vie, avec, par exemple, une méthode d'initialisation, de mise-a-jour a chaque "tick", etc..  
Chaque composant aframe laisse libre acces a son objet threejs, ce qui permet de pouvoir faire du bas niveau si besoin.

Les librairies de la communauté ne sont pas toujours bien maintenues, il est quasi obligatoire de leurs apporter des correctifs dès que notre besoin diffère des examples données.  

Techno assez jeune -> imcompatibilité entre les versions, donc problèmes si intégration de trop de libs dépendantes de version d'aframe différentes.  

Les créateurs d'aframe font des projets très perfectionnées avec, mais ils utilisent principalement threejs (qui est beaucoup plus bas niveau), qu'ils incorporent dans leurs projets aframe (ils ne se servent d'aframe que pour la structure des projets).  

Pas de composant natif (intégrée par default dans aframe) pour faire des interfaces world-space, aframe-gui et aframe-material on des bugs (impossibilité de vraiment cacher un objet et ses enfants, de plus, on ne peut pas supprimer et d'en ré-ajouter des nouveaux.. comprend pas pourquoi ( mais il y a des solutions pour s'en sortir, cependant, cela peut ajouter de la complexité a nos projet ) ).  

Web process -> Outils pour les habitués du dev javascript assez moderne, config browserify, dev/prod gulp, dev sans browerify pour debug, mais encore des problèmes avec certaines librairies et versions (auto-display des controlleurs par exemple)).

Performances moins bonnes que les moteurs traditionnels, mais très respectable pour du web, privilegié le low poly (notre scene de mouvement lag completement, sans shaders particuliers ), supercraft est un outil de modélisation qui permet l'integration facile  dans aframe, et qui est simple et rapide a prendre en main pour faire des assets low-poly correspondant a la direction artistique de aframe .  

Gestion des assets/materials/placements particuliers, process spécifiques, pas vraiment optimisé pour les graphistes, mais très bien pour des pures devs.  

Enfin, la communauté semble relativement active, même si elle ne vaut pas celle des moteurs traditionnels, cependant, les projets de la communauté sont souvent moins démonstratif que les projets vitrines, réalisé par les 3 créateurs d'aframe, mais qui n'ont d'aframe que la structure, tant les composants sont codés en treejs directement.  
