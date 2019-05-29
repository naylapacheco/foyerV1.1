import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { LoadingController, ToastController } from '@ionic/angular';
import { PostarService } from 'src/app/services/postar.service';
import { Postar } from 'src/app/interfaces/postar';
import { Subscription } from 'rxjs';



@Component({
  selector: 'app-mural',
  templateUrl: './mural.page.html',
  styleUrls: ['./mural.page.scss'],
})
export class MuralPage implements OnInit {
  private loading: any;
  //aqui mudei de postar para postagem
  public postagem = new Array<Postar>();
  private postarSubscription: Subscription;



  constructor(
    private loadingCtrl: LoadingController,
    private postarService: PostarService,
    private toastCtrl: ToastController
  ) {
    this.postarSubscription = this.postarService.getPostar().subscribe(data => {
      this.postagem = data;
    });

  }

  ngOnInit() { }
  ngOnDestroy() {
    this.postarSubscription.unsubscribe();
  }

  async presentLoading() {
    this.loading = await this.loadingCtrl.create({ message: 'Aguarde...' });
    return this.loading.present();
  }

  async deletePostar(id: string) {
    try {
      await this.postarService.deletePostar(id);
    } catch (error) {
      this.presentToast('Erro ao tentar deletar');
    }
  }

  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({ message, duration: 2000 });
    toast.present();
  }
}

