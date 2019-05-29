import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'TabsPageModule', loadChildren: './tabs/tabs.module#TabsPageModule' },
  { path: 'TabsPageModule/:id', loadChildren: './tabs/tabs.module#TabsPageModule' },
  { path: 'cadastro', loadChildren: './cadastro/cadastro.module#CadastroPageModule' },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'enviarmsg', loadChildren: './enviarmsg/enviarmsg.module#EnviarmsgPageModule' },
  { path: 'mural', loadChildren: './mural/mural.module#MuralPageModule' },
  { path: 'eventos', loadChildren: './eventos/eventos.module#EventosPageModule' },
  { path: 'usuarios/:id', loadChildren: './usuarios/usuarios.module#UsuariosPageModule' },
  { path: 'usuarios', loadChildren: './usuarios/usuarios.module#UsuariosPageModule' },
  { path: 'info/:id', loadChildren: './info/info.module#InfoPageModule' },
  { path: 'post', loadChildren: './post/post.module#PostPageModule' },
  { path: 'post/:id', loadChildren: './post/post.module#PostPageModule' },
  { path: 'uploader', loadChildren: './uploader/uploader.module#UploaderPageModule' },
  { path: 'feedmorador', loadChildren: './feedmorador/feedmorador.module#FeedmoradorPageModule' },

  
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
