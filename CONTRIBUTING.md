# Contribuer à LudusRegula

Merci ❤️ d’aider à enrichir la bibliothèque de règles !

## Comment ajouter un jeu

1. **PDF**  
   Placez le fichier dans `public/rules/` et nommez-le `<id>.pdf`.  
   - Taille max : **20 MB**  
   - Exemple : `public/rules/les-colons-de-catane.pdf`

2. **Vignette** (recommandé)  
   Placez une image **WebP** (idéal) dans `public/thumbs/` et, si besoin, un **JPG/PNG** de secours.  
   - Ratio conseillé : ~ **3:2**  
   - Poids conseillé : **≤ 200 KB**  
   - Exemple :  
     - `public/thumbs/les-colons-de-catane.webp`  
     - `public/thumbs/les-colons-de-catane.jpg`

3. **Entrée JSON**  
   Éditez `public/data/games.json` et ajoutez :
   ```json
   {
     "id": "les-colons-de-catane",
     "name": "Les Colons de Catane",
     "summary": "Développez votre colonie, échangez et construisez pour gagner.",
     "pdf": "/rules/les-colons-de-catane.pdf",
     "thumb": {
       "webp": "/thumbs/les-colons-de-catane.webp",
       "jpg": "/thumbs/les-colons-de-catane.jpg"
     },
     "tags": ["famille","stratégie","commerce"]
   }
   ```

4. **Règles de nommage**
   - `id` en **kebab-case** ascii unique.
   - `tags` en **minuscules**.
   - Chemins **absolus** (`/rules/...`, `/thumbs/...`) — *le build gère /ludusregula/*.

5. **Tests locaux**
   ```bash
   npm run validate
   npm run build
   ```
   La CI vérifie aussi tout ça sur chaque PR.

6. **Ouvrir une PR**
   - Depuis une branche `feat/add-<id>`.
   - Remplissez le **template PR**.
   - Idéal : joindre une capture de la carte.

## Alternatives
- Pas à l’aise avec Git ? Ouvrez une **issue “Proposer une règle”** et joignez vos fichiers.  
  On se charge du reste.

Merci et bon jeu 🎲
