import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { TodoModule } from './app.module';
const platform = platformBrowserDynamic();
platform.bootstrapModule(TodoModule);
