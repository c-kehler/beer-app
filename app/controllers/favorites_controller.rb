class FavoritesController < ApplicationController
    def index
        @beers = Beer.all
        render json: { message: "ok", beers: @beers }
      end

      def show_favorites
        @user = User.find(params[:user_id])
        render json: @user.to_json(include: :beers)
      end
      
    def favorites
        @user = User.find(params[:user_id])
        @beer = Beer.find(params[:beer_id])
        @user.beers.push(@beer)
    end
end
