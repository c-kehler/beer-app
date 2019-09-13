class BeersController < ApplicationController
    before_action :set_beer, only: %i[show update destroy]

  def index
    @beers = Beer.all
    render json: { message: "ok", beers: @beers }
  end
    
#   def show
#     begin
#       @beer = Beer.find(params[:id])
#       render json: { message: "ok", beer: @beer}
#     rescue ActiveRecord::RecordNotFound
#       render json: { message: 'no beer matches that ID' }, status: 404
#     rescue StandardError => e
#       render json: { message: e.to_s }, status: 500
#     end
#   end

  def name
    begin
      @beer = Beer.find_by_name(params[:name])
     if @beer.save
        render json: @beer, status: :ok
          else
            render json: @beer.errors, status: :unprocessable_entity
    end
end
end

  def create
    @beer = Beer.new(beer_params)

    if @beer.save
      render json: @beer, status: :created
    else
      render json: @beer.errors, status: :unprocessable_entity
    end
  end

  def update
    if @beer.update(beer_params)
      render json: @beer
    else
      render json: @beer.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @beer.destroy
  end

  private

  def set_beer
    @beer = Beer.find(params[:id])
  rescue ActiveRecord::RecordNotFound
    render json: { message: 'no beer matches that ID' }, status: 404
  end

  def beer_params
    params.require(:beer).permit(:name, :image, :description, :rating, :review)
  end

end
