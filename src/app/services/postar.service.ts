import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Postar } from '../interfaces/postar';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PostarService {
  private postarCollection: AngularFirestoreCollection<Postar>;

  constructor(private afs: AngularFirestore) {
    //postar eu mudei para Postagem
    this.postarCollection = this.afs.collection<Postar>('Postagem');

  }
  getPostar() {
    return this.postarCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;

          return { id, ...data };
        });
      })
    );
  }

  addPostar(postar: Postar) {
    return this.postarCollection.add(postar);
  }

  getPost(id: string) {
    return this.postarCollection.doc<Postar>(id).valueChanges();
  }

  updatePostar(id: string, postar: Postar) {
    return this.postarCollection.doc<Postar>(id).update(postar);
  }

  deletePostar(id: string) {
    return this.postarCollection.doc(id).delete();
  }
}

