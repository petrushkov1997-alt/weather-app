import { Paper } from 'shared/ui/Paper';
import { City } from '../../types';
import styles from './styles.module.css';

interface WeatherCardProps {
  city: City;
  temp: number;
  condition: string;
  wind: number;
  tempMin?: number;
  tempMax?: number;
}

export const WeatherCard = ({
  city,
  temp,
  condition,
  wind,
  tempMin,
  tempMax,
}: WeatherCardProps) => {
  return (
    <Paper>
      <h3 className={styles.city}>
        {city.name}, {city.country}
      </h3>

      <div className={styles.main}>
        <div className={styles.temperature}>{temp}°</div>
        <div>
          <p className={styles.condition}>{condition}</p>
          <div className={styles.details}>
            <span>
              Wind: <strong>{wind} kph</strong>
            </span>
            {tempMin != null && (
              <span>
                Min: <strong>{tempMin}°</strong>
              </span>
            )}
            {tempMax != null && (
              <span>
                Max: <strong>{tempMax}°</strong>
              </span>
            )}
          </div>
        </div>
      </div>
    </Paper>
  );
};
