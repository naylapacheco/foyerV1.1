import { Component, OnInit } from '@angular/core';
import { PostarService } from 'src/app/services/postar.service';
import { ActivatedRoute } from '@angular/router';
import { Postar } from 'src/app/interfaces/postar';
import { NavController, LoadingController, ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-post',
  templateUrl: './post.page.html',
  styleUrls: ['./post.page.scss'],
})
export class PostPage implements OnInit {

  private postarId: string = null;
  public postar: Postar = {};
  private loading: any;
  private postarSubscription: Subscription;
  
  constructor(
    private postarService: PostarService,
    private activatedRoute: ActivatedRoute,
    private navCtrl: NavController,
    private loadingCtrl: LoadingController,
    private authService: AuthService,
    private toastCtrl: ToastController
  ) {
    this.postarId = this.activatedRoute.snapshot.params['id'];

    if (this.postarId) this.loadPostar();
  }

  ngOnInit() { }

  ngOnDestroy() {
    if (this.postarSubscription) this.postarSubscription.unsubscribe();
  }

  loadPostar() {
    this.postarSubscription = this.postarService.getPost(this.postarId).subscribe(data => {
      this.postar= data;
    });
  }

  async savePostar() {
    await this.presentLoading();

    this.postar.userId = this.authService.getAuth().currentUser.uid;

    if (this.postarId) {
      try {
        await this.postarService.updatePostar(this.postarId, this.postar);
        await this.loading.dismiss();

        this.navCtrl.navigateBack('tabs/mural');
      } catch (error) {
        this.presentToast('Erro ao tentar salvar');
        this.loading.dismiss();
      }
    } else {
      this.postar.createdAt = new Date().getTime();

      try {
        await this.postarService.addPostar(this.postar);
        await this.loading.dismiss();

        this.navCtrl.navigateBack('tabs/mural');
      } catch (error) {
        this.presentToast('Erro ao tentar salvar');
        this.loading.dismiss();
      }
    }
  }


  async presentLoading() {
    this.loading = await this.loadingCtrl.create({ message: 'Aguarde...' });
    return this.loading.present();
  }

  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({ message, duration: 2000 });
    toast.present();
  }
}


