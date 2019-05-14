import { Injectable } from '@angular/core';
import { AngularFirestore , AngularFirestoreCollection} from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Cadastro } from '../modelos/cadastro.interface';
import { Action } from 'rxjs/internal/scheduler/Action';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  private coletarTodos: AngularFirestoreCollection<Cadastro>;
  private todos: Observable<Cadastro[]>;

  constructor(db:AngularFirestore) { 
    this.coletarTodos = db.collection<Cadastro>('todos');
    this.todos = this.coletarTodos.snapshotChanges().pipe(map(
      actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return {id, ...data};
        });
      }
    ));
  }

  getTodos(){
    return this.todos;
  }
  getTudo(id:string){
    return this.coletarTodos.doc<Cadastro>(id).valueChanges();
  }

  update(tudo:Cadastro, id:string){
    return this.coletarTodos.doc(id).update(tudo);
  }
  addTudo(tudo:Cadastro){
    return this.coletarTodos.add(tudo);
  }
  deleteTudo(id:string ){
    return this.coletarTodos.doc(id).delete();
  }

}

