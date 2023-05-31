import express, {Application} from 'express';
import cors from 'cors'
import compression from 'compression'
import helmet from 'helmet'
import morgan from 'morgan'
import nocache from 'nocache'
import env from 'dotenv'

import dbConnect from '../src/config/dbConnect'
import user_route from './routes/userRoute';
import admin_route from './routes/adminRoute';

class nodeApp{

  public app:Application

    constructor(){
      this.app = express()
      env.config()
      dbConnect()

      this.listen()
      this.initialiseMiddleware()
      this.initialiseRoutes()
    }

    private initialiseMiddleware():void{
      this.app.use(helmet());
        this.app.use(cors());
        this.app.use(morgan('dev'));
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));
        this.app.use(compression());
        this.app.use(nocache())
    }

    private initialiseRoutes():void{
      this.app.use('/',user_route)
      this.app.use('/admin',admin_route)
    }
    
    public listen():void{
      this.app.listen(process.env.PORT,()=>console.log('server is running'))
    }
}


const server = new nodeApp()


